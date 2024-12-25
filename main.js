// Firebase setup
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDuXPtx4aV822_tB8DzJi-MkzlbhYbUj7I",
  authDomain: "authform-71285.firebaseapp.com",
  projectId: "authform-71285",
  storageBucket: "authform-71285.firebasestorage.app",
  messagingSenderId: "608787185054",
  appId: "1:608787185054:web:8baa57a24d8024f1ccea8f",
  measurementId: "G-LV5QF0ZX9M"
});

const auth = firebaseApp.auth();

function togglePasswordVisibility(passwordFieldId, eyeButtonId) {
  const passwordField = document.getElementById(passwordFieldId);
  const eyeButton = document.getElementById(eyeButtonId);

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeButton.textContent = "🙈"; // Change to "hide" icon
  } else {
    passwordField.type = "password";
    eyeButton.textContent = "👁"; // Change to "show" icon
  }
}

// Sign-Up Function
const signUp = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase sign-up
  auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      // Send email verification
      result.user.sendEmailVerification().then(() => {
        alert("Sign-up successful. A verification email has been sent (Musin). Please verify your email before signing in.");
        
        // Optionally, clear the form
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        
        // Redirect to sign-in page
        window.location.href = "signin.html"; 
      });
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      alert("Error signing up. Please try again.");
    });
};

// Sign-In Function
const signIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase sign-in
  auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      if (result.user.emailVerified) {
        // User's email is verified, proceed to the main website
        sessionStorage.setItem("userLoggedIn", true);
        window.location.href = "index.html"; // Redirect to the main website
      } else {
        // User's email is not verified, prompt for email verification
        alert("Please verify your email before signing in.");
        auth.signOut(); // Log out the user
      }
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      alert("Invalid credentials or email not verified. Please try again.");
    });
};

// Logout function
const logout = () => {
  auth.signOut().then(() => {
    // Clear session on logout
    sessionStorage.removeItem("userLoggedIn");
    // Redirect to login page
    window.location.href = "signin.html";
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
};



