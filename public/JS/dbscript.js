
const firebaseConfig = {
    apiKey: "AIzaSyBExfIBAmP5ujTAoDqiqJ1gbiVAmAMwXp8",
  authDomain: "mcu-project-d7fb6.firebaseapp.com",
  databaseURL: "https://mcu-project-d7fb6-default-rtdb.firebaseio.com",
  projectId: "mcu-project-d7fb6",
  storageBucket: "mcu-project-d7fb6.appspot.com",
  messagingSenderId: "344160732320",
  appId: "1:344160732320:web:814bef539db167384435c5",
  measurementId: "G-4XVSW6BZ9K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//Create a location on database called contactForm
var contactFormDB = firebase.database().ref("contactForm");
var storageRef = firebase.storage().ref();

// Handle form submission
document.getElementById("characterForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    if (!validateForm()) {
        return; // Stop form submission if validation fails
    }

    var charId = document.getElementById("charId").value;
    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");
    var imageFile = document.getElementById("imageFile").files[0];

    if (charId) {
        updateMessage(charId, name, emailid, msgContent, imageFile);
    } else {
        saveMessages(name, emailid, msgContent, imageFile);
    }

    scrollToBottom();
    document.getElementById("characterForm").reset();
}

// Save messages with image upload
const saveMessages = (name, emailid, msgContent, imageFile) => {
    try {
        var newContactForm = contactFormDB.push();

        if (imageFile) {
            var imageName = imageFile.name;
            var imageUploadTask = storageRef.child('images/' + imageName).put(imageFile);

            imageUploadTask.on('state_changed', 
                (snapshot) => {
                    // Progress function if needed
                }, 
                (error) => {
                    console.error("Image upload failed:", error);
                    alert("Failed to upload image. Please try again.");
                }, 
                () => {
                    imageUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        newContactForm.set({
                            name: name,
                            emailid: emailid,
                            msgContent: msgContent,
                            imageName: imageName, 
                            imageURL: downloadURL 
                        }, function(error) {
                            if (error) {
                                console.error("Data save failed:", error);
                                alert("Failed to save data. Please try again.");
                            } else {
                                console.log("Data saved successfully.");
                            }
                        });
                    });
                }
            );
        } else {
            newContactForm.set({
                name: name,
                emailid: emailid,
                msgContent: msgContent,
                imageName: "", // No image
                imageURL: ""   // No image
            }, function(error) {
                if (error) {
                    console.error("Data save failed:", error);
                    alert("Failed to save data. Please try again.");
                } else {
                    console.log("Data saved successfully.");
                }
            });
        }
    } catch (error) {
        console.error("An error occurred while saving data:", error);
        alert("An unexpected error occurred. Please try again.");
    }
}

// Update messages with image upload
const updateMessage = (charId, name, emailid, msgContent, imageFile) => {
    try {
        var updateContactForm = contactFormDB.child(charId);

        if (imageFile) {
            var imageName = imageFile.name;
            var imageUploadTask = storageRef.child('images/' + imageName).put(imageFile);

            imageUploadTask.on('state_changed', 
                (snapshot) => {
                    // Progress function if needed
                }, 
                (error) => {
                    console.error("Image upload failed:", error);
                    alert("Failed to upload image. Please try again.");
                }, 
                () => {
                    imageUploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        updateContactForm.update({
                            name: name,
                            emailid: emailid,
                            msgContent: msgContent,
                            imageName: imageName,
                            imageURL: downloadURL
                        }, function(error) {
                            if (error) {
                                console.error("Update failed:", error);
                                alert("Failed to update data. Please try again.");
                            } else {
                                console.log("Update succeeded.");
                                scrollToBottom();
                            }
                        });
                    });
                }
            );
        } else {
            updateContactForm.update({
                name: name,
                emailid: emailid,
                msgContent: msgContent,
                imageName: "", // No image
                imageURL: ""   // No image
            }, function(error) {
                if (error) {
                    console.error("Update failed:", error);
                    alert("Failed to update data. Please try again.");
                } else {
                    console.log("Update succeeded.");
                    scrollToBottom();
                }
            });
        }
    } catch (error) {
        console.error("An error occurred while updating data:", error);
        alert("An unexpected error occurred. Please try again.");
    }
}

// Fetch and display data in the table
contactFormDB.on("value", function(snapshot) {
    try {
        document.getElementById("characterTableBody").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            var charId = childSnapshot.key;
            var data = childSnapshot.val();

            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.emailid}</td>
                <td>${data.msgContent}</td>
                <td>${data.imageURL ? `<a href="${data.imageURL}" target="_blank">View Image</a>` : "No Image"}</td>
                <td>
                    <button class="btn btn-primary" onclick="editMessage('${charId}', '${data.name}', '${data.emailid}', '${data.msgContent}', '${data.imageURL}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteMessage('${charId}')">Delete</button>
                </td>
            `;
            document.getElementById("characterTableBody").appendChild(row);
        });
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        alert("Failed to retrieve data. Please refresh the page and try again.");
    }
});

const deleteMessage = (charId) => {
    // Ask the user for confirmation before deleting
    const userConfirmed = confirm("Are you sure you want to delete this data? This action cannot be undone.");

    if (userConfirmed) {
        try {
            contactFormDB.child(charId).remove(function(error) {
                if (error) {
                    console.error("Delete failed:", error);
                    alert("Failed to delete data. Please try again.");
                } else {
                    console.log("Data deleted successfully.");
                    alert("Data deleted successfully.");
                }
            });
        } catch (error) {
            console.error("An error occurred while deleting data:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    } else {
        // If the user clicks "Cancel," do nothing
        console.log("User canceled the deletion.");
    }
};

// Edit message
function editMessage(charId, name, emailid, msgContent, imageURL) {
    document.getElementById("charId").value = charId;
    document.getElementById("name").value = name;
    document.getElementById("emailid").value = emailid;
    document.getElementById("msgContent").value = msgContent;
    if (imageURL) {
        document.getElementById("existingImageLink").innerHTML = `<a href="${imageURL}" target="_blank">View Current Image</a>`;
    }
    scrollToTop();
}

// Utility functions
const getElementVal = (id) => document.getElementById(id).value;

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll to the top
    });
}

function validateForm() {
    const name = document.getElementById("name");
    const emailid = document.getElementById("emailid");
    const msgContent = document.getElementById("msgContent");

    let isValid = true;

    if (name.value.trim() === "" || name.value.length < 3 || name.value.length > 50) {
        name.classList.add("is-invalid");
        isValid = false;
    } else {
        name.classList.remove("is-invalid");
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(emailid.value)) {
        emailid.classList.add("is-invalid");
        isValid = false;
    } else {
        emailid.classList.remove("is-invalid");
    }

    if (msgContent.value.trim() === "" || msgContent.value.length > 30) {
        msgContent.classList.add("is-invalid");
        isValid = false;
    } else {
        msgContent.classList.remove("is-invalid");
    }

    return isValid;
}

