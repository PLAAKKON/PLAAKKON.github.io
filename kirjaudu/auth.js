import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// Rekisteröidy käyttäjäksi
window.registerUser = function() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Rekisteröinti onnistui!');
            const user = userCredential.user;
            setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date()
            });
        })
        .catch((error) => {
            console.error('Rekisteröinti epäonnistui:', error);
            alert(error.message);
        });
};

// Kirjaudu sisään
window.loginUser = function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Kirjautuminen onnistui!');
            window.location.href = 'https://plaakkon.github.io/profiilitesti/';
        })
        .catch((error) => {
            console.error('Kirjautuminen epäonnistui:', error);
            alert(error.message);
        });
};
