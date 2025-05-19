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
            localStorage.setItem('userEmail', email); // Tallenna sähköposti localStorageen
            window.location.href = 'https://yoro.fi/profiilitesti/index.html'; // Ohjaa profiilitestiin
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
            localStorage.removeItem('userEmail'); // Poista sähköposti localStoragesta
            window.location.href = 'https://yoro.fi'; // Ohjaa kotisivulle
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

// Navigointi Yoro.fi kotisivulle
window.navigateToHome = function() {
    window.location.href = 'https://yoro.fi/';
};

auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("logoutBtn").style.display = "block";
        document.getElementById("homeBtn").style.display = "block";
        showUserEmail(user.email);
    } else {
        document.getElementById("logoutBtn").style.display = "none";
        document.getElementById("homeBtn").style.display = "none";
        document.getElementById("userEmailDisplay").innerText = "";
    }
});
