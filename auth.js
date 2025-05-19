const auth = firebase.auth();
const db = firebase.firestore();

// Rekisteröidy käyttäjäksi
window.registerUser = function() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Rekisteröinti onnistui!');
            const user = userCredential.user;
            db.collection('users').doc(user.uid).set({
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
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Kirjautuminen onnistui!');
            window.location.href = 'https://plaakkon.github.io/profiilitesti/';
        })
        .catch((error) => {
            console.error('Kirjautuminen epäonnistui:', error);
            alert(error.message);
        });
};

// Kirjaudu ulos
window.logoutUser = function() {
    auth.signOut()
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
    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('Salasanan palautuslinkki on lähetetty sähköpostiisi.');
        })
        .catch((error) => {
            console.error('Salasanan palautus epäonnistui:', error);
            alert(error.message);
        });
};
