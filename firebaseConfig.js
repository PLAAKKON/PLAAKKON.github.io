// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnfsX522_ybXR7yhnAJbxDjuszVu4rZLE",
    authDomain: "urapolku-7780a.firebaseapp.com",
    projectId: "urapolku-7780a",
    storageBucket: "urapolku-7780a.firebasestorage.app",
    messagingSenderId: "314066598772",
    appId: "1:314066598772:web:50183db006293290378a21",
    measurementId: "G-83QWJEC5SS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
