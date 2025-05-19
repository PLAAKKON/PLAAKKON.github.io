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
            showUserEmail(userCredential.user.email);
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
            document.getElementById("userEmailDisplay").innerText = "";
            window.location.href = '/kirjaudu/index.html';
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

// Maskattu sähköpostin näyttö
const showUserEmail = (email) => {
    const [local, domain] = email.split('@');
    const maskedEmail = `${local.slice(0, 3)}...${local.slice(-3)}@${domain}`;
    document.getElementById("userEmailDisplay").innerText = `Kirjautunut: ${maskedEmail}`;
};

auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("logoutBtn").style.display = "block";
        showUserEmail(user.email);
    } else {
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("userEmailDisplay").innerText = "";
    }
});
