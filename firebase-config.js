// ============================================================
// FIREBASE CONFIGURATION & DATABASE HELPER
// ============================================================
// 
// HOW TO SET UP:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" (or "Add project")
// 3. Enter a project name (e.g., "premium-store") → Continue
// 4. Disable Google Analytics (not needed) → Create Project
// 5. Once created, click the Web icon (</>) to add a web app
// 6. Enter a nickname (e.g., "premium-store-web") → Register app
// 7. Copy the firebaseConfig object and paste it below
// 8. Go to "Build" → "Realtime Database" → "Create Database"
// 9. Choose your region → Start in TEST MODE → Enable
// 10. Done! Your products will now sync across all devices.
//
// IMPORTANT: After 30 days, test mode expires. Update rules to:
//   { "rules": { ".read": true, ".write": true } }
//   (or add authentication for better security)
// ============================================================

// Your Firebase configuration (cloth-80369 project)
const firebaseConfig = {
    apiKey: "FQy4HArVdBbZ87AHrbfdhSXRgyE5NUbrh6GaL8enMUeh",
    authDomain: "cloth-80369.firebaseapp.com",
    databaseURL: "https://cloth-80369-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cloth-80369",
    storageBucket: "cloth-80369.firebasestorage.app",
    messagingSenderId: "310034596189",
    appId: "1:310034596189:web:20fc9c619939c27380a8b4",
    measurementId: "G-S61GJP3KV3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ============================================================
// FirebaseDB — Read/Write Products & Categories
// ============================================================

const FirebaseDB = {
    _initialized: false,
    _resolveReady: null,

    // Promise that resolves when initial data is loaded from Firebase
    ready: null,

    init() {
        this.ready = new Promise((resolve) => {
            this._resolveReady = resolve;
        });

        let productsLoaded = false;
        let categoriesLoaded = false;

        const checkReady = () => {
            if (productsLoaded && categoriesLoaded) {
                this._initialized = true;
                this._resolveReady();
            }
        };

        // Listen for products
        db.ref('products').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                PRODUCTS = data;
                // Also cache in localStorage for offline fallback
                localStorage.setItem('pmcAdminProducts', JSON.stringify(PRODUCTS));
            }
            productsLoaded = true;
            checkReady();

            // If already initialized, fire update event for live sync
            if (this._initialized) {
                window.dispatchEvent(new CustomEvent('productsUpdated'));
            }
        }, (error) => {
            console.warn('Firebase products read failed:', error);
            // Fallback: use localStorage or defaults (already set in data.js)
            productsLoaded = true;
            checkReady();
        });

        // Listen for categories
        db.ref('categories').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                CATEGORIES = data;
                localStorage.setItem('pmcAdminCategories', JSON.stringify(CATEGORIES));
            }
            categoriesLoaded = true;
            checkReady();

            if (this._initialized) {
                window.dispatchEvent(new CustomEvent('categoriesUpdated'));
            }
        }, (error) => {
            console.warn('Firebase categories read failed:', error);
            categoriesLoaded = true;
            checkReady();
        });
    },

    // Save products to Firebase
    saveProducts() {
        return db.ref('products').set(PRODUCTS).then(() => {
            localStorage.setItem('pmcAdminProducts', JSON.stringify(PRODUCTS));
        }).catch(err => {
            console.error('Firebase save products failed:', err);
            // Still save to localStorage as fallback
            localStorage.setItem('pmcAdminProducts', JSON.stringify(PRODUCTS));
        });
    },

    // Save categories to Firebase
    saveCategories() {
        return db.ref('categories').set(CATEGORIES).then(() => {
            localStorage.setItem('pmcAdminCategories', JSON.stringify(CATEGORIES));
        }).catch(err => {
            console.error('Firebase save categories failed:', err);
            localStorage.setItem('pmcAdminCategories', JSON.stringify(CATEGORIES));
        });
    },

    // Upload current local data to Firebase (first-time setup)
    seedData() {
        return Promise.all([
            db.ref('products').set(PRODUCTS),
            db.ref('categories').set(CATEGORIES)
        ]).then(() => {
            console.log('Data seeded to Firebase successfully');
        });
    }
};

// ============================================================
// FIREBASE AUTH — User Authentication & Profiles
// ============================================================

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const FirebaseAuth = {
    // Sign up with email & password
    async signUp(email, password, name, phone) {
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            // Update display name
            await cred.user.updateProfile({ displayName: name });
            // Save user profile to Realtime DB
            await db.ref('users/' + cred.user.uid).set({
                name,
                email: email.toLowerCase(),
                phone: phone || '',
                createdAt: new Date().toISOString(),
                provider: 'email'
            });
            return { ok: true, user: { uid: cred.user.uid, name, email, phone } };
        } catch (err) {
            let message = err.message;
            if (err.code === 'auth/email-already-in-use') message = 'This email is already registered. Please login instead.';
            if (err.code === 'auth/weak-password') message = 'Password should be at least 6 characters.';
            if (err.code === 'auth/invalid-email') message = 'Please enter a valid email address.';
            return { ok: false, error: message };
        }
    },

    // Sign in with email & password
    async signIn(email, password) {
        try {
            const cred = await auth.signInWithEmailAndPassword(email, password);
            // Fetch profile from DB
            const snap = await db.ref('users/' + cred.user.uid).once('value');
            const profile = snap.val() || {};
            return {
                ok: true,
                user: {
                    uid: cred.user.uid,
                    name: cred.user.displayName || profile.name || '',
                    email: cred.user.email,
                    phone: profile.phone || ''
                }
            };
        } catch (err) {
            let message = err.message;
            if (err.code === 'auth/user-not-found') message = 'No account found with this email.';
            if (err.code === 'auth/wrong-password') message = 'Incorrect password. Please try again.';
            if (err.code === 'auth/invalid-credential') message = 'Invalid email or password.';
            if (err.code === 'auth/too-many-requests') message = 'Too many failed attempts. Please try again later.';
            return { ok: false, error: message };
        }
    },

    // Sign in with Google (real OAuth popup)
    async signInWithGoogle() {
        try {
            const result = await auth.signInWithPopup(googleProvider);
            const user = result.user;
            // Check if profile exists, if not create one
            const snap = await db.ref('users/' + user.uid).once('value');
            if (!snap.exists()) {
                await db.ref('users/' + user.uid).set({
                    name: user.displayName || '',
                    email: user.email,
                    phone: user.phoneNumber || '',
                    createdAt: new Date().toISOString(),
                    provider: 'google',
                    photoURL: user.photoURL || ''
                });
            }
            const profile = snap.val() || {};
            return {
                ok: true,
                user: {
                    uid: user.uid,
                    name: user.displayName || profile.name || '',
                    email: user.email,
                    phone: profile.phone || ''
                }
            };
        } catch (err) {
            if (err.code === 'auth/popup-closed-by-user') return { ok: false, error: 'Sign-in cancelled.' };
            if (err.code === 'auth/popup-blocked') return { ok: false, error: 'Pop-up blocked. Please allow pop-ups and try again.' };
            return { ok: false, error: err.message };
        }
    },

    // Sign out
    async signOut() {
        await auth.signOut();
    },

    // Get current user
    getCurrentUser() {
        return auth.currentUser;
    },

    // Auth state listener — fires on login/logout
    onAuthChange(callback) {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const snap = await db.ref('users/' + user.uid).once('value');
                const profile = snap.val() || {};
                callback({
                    uid: user.uid,
                    name: user.displayName || profile.name || '',
                    email: user.email,
                    phone: profile.phone || '',
                    photoURL: user.photoURL || profile.photoURL || ''
                });
            } else {
                callback(null);
            }
        });
    },

    // Update user profile in DB
    async updateProfile(uid, updates) {
        try {
            await db.ref('users/' + uid).update(updates);
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message };
        }
    }
};

