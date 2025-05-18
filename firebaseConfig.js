<script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore-compat.js"></script>

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "urapolku-7780a.firebaseapp.com",
    projectId: "urapolku-7780a",
    storageBucket: "urapolku-7780a.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
