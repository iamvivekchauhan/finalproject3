
const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBExfIBAmP5ujTAoDqiqJ1gbiVAmAMwXp8",
  authDomain: "mcu-project-d7fb6.firebaseapp.com",
  projectId: "mcu-project-d7fb6",
  storageBucket: "mcu-project-d7fb6.appspot.com",
  messagingSenderId: "344160732320",
  appId: "1:344160732320:web:814bef539db167384435c5",
  measurementId: "G-4XVSW6BZ9K"
});

// Initialize Firebase
const auth = firebaseApp.auth()

const signUp = () => {
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value 
    console.log(email, password)

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
        //If successful
        window.location.replace('/');
        console.log(result)
    })
    .catch((error) => {
        //If error
        console.log(error.code)
        console.log(error.message)
    })
}

const signIn = () => {
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value 

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
        // Signed in
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                if (idTokenResult.claims.admin) {
                    // Show "Add character" link
                    document.getElementById("addCharacterLink").style.display = "block";
                } else {
                    // Fade "Add character" link
                    document.getElementById("addCharacterLink").style.display = "none";
                }
            })
            .catch((error) => {
                console.log("Error getting ID token:", error);
            });

        window.location.replace('Index');
    })
    .catch((error) => {
        console.log(error.code);
        console.log(error.message);
    });
};


const signOut = () => {
    firebase.auth().signOut()
    .then(() => {
        // Sign-out successful.
        console.log('User signed out.');
        window.location.replace('/'); // Redirect to the home page or login page
    })
    .catch((error) => {
        // An error happened during sign-out.
        console.log(error.message);
    });
}
  

  