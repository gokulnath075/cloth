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
// FIREBASE AUTH — User Accounts via Realtime Database
// ============================================================
// Uses SHA-256 password hashing (Web Crypto API)
// Stores users in RTDB under /users/{emailKey}

// Hash a password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '_pmc_salt_2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Convert email to a safe Firebase key (no dots, @, etc.)
function emailToKey(email) {
    return email.toLowerCase().replace(/[.#$\[\]@]/g, '_');
}

const FirebaseAuth = {
    // Sign up with email & password
    async signUp(email, password, name, phone) {
        try {
            const key = emailToKey(email);
            const snap = await db.ref('users/' + key).once('value');
            if (snap.exists()) {
                return { ok: false, error: 'This email is already registered. Please login instead.' };
            }
            const hashedPw = await hashPassword(password);
            const uid = 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
            const userData = {
                uid, name, email: email.toLowerCase(), phone: phone || '',
                password: hashedPw, createdAt: new Date().toISOString(), provider: 'email'
            };
            await db.ref('users/' + key).set(userData);
            return { ok: true, user: { uid, name, email: email.toLowerCase(), phone: phone || '' } };
        } catch (err) {
            return { ok: false, error: err.message || 'Sign up failed. Please try again.' };
        }
    },

    // Sign in with email & password
    async signIn(email, password) {
        try {
            const key = emailToKey(email);
            const snap = await db.ref('users/' + key).once('value');
            if (!snap.exists()) return { ok: false, error: 'No account found with this email.' };
            const user = snap.val();
            const hashedPw = await hashPassword(password);
            if (user.password !== hashedPw) return { ok: false, error: 'Incorrect password. Please try again.' };
            return { ok: true, user: { uid: user.uid, name: user.name, email: user.email, phone: user.phone || '' } };
        } catch (err) {
            return { ok: false, error: err.message || 'Sign in failed. Please try again.' };
        }
    },

    // Sign out (clears local session)
    async signOut() {
        Store.logout();
    },

    // Find user by email
    async findByEmail(email) {
        const key = emailToKey(email);
        const snap = await db.ref('users/' + key).once('value');
        return snap.exists() ? snap.val() : null;
    },

    // Update user profile
    async updateProfile(email, updates) {
        try {
            const key = emailToKey(email);
            await db.ref('users/' + key).update(updates);
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message };
        }
    },

    // Reset password (verify email exists, then update password)
    async resetPassword(email, newPassword) {
        try {
            const key = emailToKey(email);
            const snap = await db.ref('users/' + key).once('value');
            if (!snap.exists()) return { ok: false, error: 'No account found with this email address.' };
            const hashedPw = await hashPassword(newPassword);
            await db.ref('users/' + key).update({ password: hashedPw });
            return { ok: true };
        } catch (err) {
            return { ok: false, error: err.message || 'Password reset failed. Please try again.' };
        }
    }
};

// ============================================================
// FIREBASE ORDERS — Order Persistence in Realtime Database
// ============================================================
// Stores orders under /orders/{emailKey}/{orderId}

const FirebaseOrders = {
    // Save an order for a user
    async save(userEmail, order) {
        if (!userEmail) return;
        try {
            const key = emailToKey(userEmail);
            await db.ref('orders/' + key + '/' + order.id).set(order);
        } catch (err) {
            console.warn('Firebase order save failed:', err);
        }
    },

    // Get all orders for a user
    async getAll(userEmail) {
        if (!userEmail) return [];
        try {
            const key = emailToKey(userEmail);
            const snap = await db.ref('orders/' + key).orderByChild('date').once('value');
            if (!snap.exists()) return [];
            const orders = [];
            snap.forEach(child => { orders.push(child.val()); });
            return orders.reverse(); // newest first
        } catch (err) {
            console.warn('Firebase orders read failed:', err);
            return [];
        }
    }
};
