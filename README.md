
--MCU Project--
This project is a web application that allows users to sign up, sign in, and manage their profiles. 

--Features--
-User Authentication: Users can sign up, sign in, and sign out using Firebase Authentication.
-Firebase Integration: The project integrates with Firebase for user authentication and storage management.
-CRUD Functionality: Admin users can create, view, update, and delete MCU characters after navigating to add character tab. This also includes SEARCH functionality for seaching any data from the table

--Installation--
Run the following command to install the necessary dependencies:
npm install
npm start
Open your browser and navigate to http://localhost:3000.

--Database Setup--
No need to set up a separate database! The project is already integrated with Firebase, which includes all the necessary keys and configurations. Firestore, Firebase's cloud database, is used for managing application data. Everything is set up and ready to go, so you can focus on development and testing without worrying about database configuration.

--Database Schema Explanation--
- charId: - This is the unique identifier for the document in the Firestore collection. Firestore automatically generates this ID when you add a new document to the collection.

Fields:
1. emailid: This field stores the email address associated with the user who created or owns this entry.
2. msgContent: This field holds the content of a message or a note related to the user or character. 
3. This field stores the name of the user or the character associated with the entry.