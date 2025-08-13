// Wait for Firebase to load
window.addEventListener('load', function() {
    // Initialize Firebase when all scripts are loaded
    if (typeof firebase !== 'undefined' && firebase.auth) {
        console.log('Firebase loaded successfully');
    } else {
        console.error('Firebase not loaded properly');
    }
});

// Get return URL from query parameters
function getReturnUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnUrl');
    return returnUrl || '../';
}

// Register user function
function registerUser() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!email || !password) {
        alert('Täytä kaikki kentät');
        return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered:', user);
            alert('Rekisteröinti onnistui!');
            // Redirect based on return URL
            window.location.href = getReturnUrl();
        })
        .catch((error) => {
            console.error('Registration error:', error);
            alert('Rekisteröinti epäonnistui: ' + error.message);
        });
}

// Login user function
function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Täytä kaikki kentät');
        return;
    }
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user);
            alert('Kirjautuminen onnistui!');
            // Redirect based on return URL
            window.location.href = getReturnUrl();
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('Kirjautuminen epäonnistui: ' + error.message);
        });
}

// Logout function
function logoutUser() {
    firebase.auth().signOut().then(() => {
        console.log('User logged out');
        alert('Olet kirjautunut ulos');
        window.location.href = '../';
    }).catch((error) => {
        console.error('Logout error:', error);
    });
}

// Check authentication state
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user.email);
    } else {
        console.log('User is signed out');
    }
});

// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

// Reset password function
function resetPassword() {
    const email = document.getElementById('loginEmail').value;
    
    if (!email) {
        alert('Syötä sähköpostiosoite ensin');
        return;
    }
    
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Salasanan resetointilinkki lähetetty sähköpostiisi!');
        })
        .catch((error) => {
            console.error('Password reset error:', error);
            alert('Virhe salasanan resetoinnissa: ' + error.message);
        });
}
