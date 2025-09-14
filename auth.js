import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
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
            
            // Set localStorage for profiilitesti compatibility
            localStorage.setItem('userEmail', userCredential.user.email);
            
            // Use relative URL to work on both yoro.fi and plaakkon.github.io
            window.location.href = '/profiilitesti/';
        })
        .catch((error) => {
            console.error('Kirjautuminen epäonnistui:', error);
            alert(error.message);
        });
};

// Kirjaudu ulos
window.logoutUser = function() {
    signOut(auth)
        .then(() => {
            alert('Olet kirjautunut ulos.');
            window.location.href = '/kirjaudu/index.html'; // Vaihda tarvittaessa oikea osoite
        })
        .catch((error) => {
            console.error('Uloskirjautuminen epäonnistui:', error);
            alert(error.message);
        });
};

// Salasanan palautus
window.forgotPassword = function() {
    const email = document.getElementById('loginEmail').value;
    if (!email) {
        alert('Syötä sähköpostiosoite salasanan palautusta varten.');
        return;
    }
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Salasanan palautuslinkki on lähetetty sähköpostiisi.');
        })
        .catch((error) => {
            console.error('Salasanan palautus epäonnistui:', error);
            alert(error.message);
        });
};
