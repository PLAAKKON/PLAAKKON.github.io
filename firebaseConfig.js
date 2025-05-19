const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "urapolku-7780a.firebaseapp.com",
    projectId: "urapolku-7780a",
    storageBucket: "urapolku-7780a.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
