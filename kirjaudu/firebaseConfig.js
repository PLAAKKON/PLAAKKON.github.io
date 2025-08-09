// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8QDgmrE1N3oMY0PkX1VzH9XN8JfGfO-w",
    authDomain: "urapolku-7780a.firebaseapp.com",
    projectId: "urapolku-7780a",
    storageBucket: "urapolku-7780a.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
