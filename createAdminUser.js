const admin = require("firebase-admin");

// Replace with the path to your service account key file
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mcu-project-d7fb6.firebaseio.com"
});

// Create a new user and set admin custom claims
function createAdminUser(email, password) {
  admin.auth().createUser({
    email: email,
    password: password,
  })
  .then((userRecord) => {
    return admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
  })
  .then(() => {
    console.log(`Successfully created admin user with email: ${email}`);
  })
  .catch((error) => {
    console.error("Error creating admin user:", error);
  });
}

// Example usage:
createAdminUser("vishal.saini29031997@gmail.com", "Vishal@9830");  // Replace with the admin's email and password
