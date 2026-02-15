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

// 
<script type="module">
  // Import the functions you need from the SDKs you need
    import {initializeApp} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
    import {getAnalytics} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "FQy4HArVdBbZ87AHrbfdhSXRgyE5NUbrh6GaL8enMUeh",
    authDomain: "cloth-80369.firebaseapp.com",
    projectId: "cloth-80369",
    storageBucket: "cloth-80369.firebasestorage.app",
    messagingSenderId: "310034596189",
    appId: "1:310034596189:web:20fc9c619939c27380a8b4",
    measurementId: "G-S61GJP3KV3"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
</script>

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
