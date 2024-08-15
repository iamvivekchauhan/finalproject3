const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "./layouts/layout");
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/', (req, res) => {
    res.render('signin');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/phase1', (req, res) => {
    res.render('phase1');
});

app.get('/phase2', (req, res) => {
    res.render('phase2');
});


app.get('/phase3', (req, res) => {
    res.render('phase3'); 
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/add-character', (req, res) => {
    res.render('Add character');
});




// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, message } = req.body;
    res.render('result', { name, message });
});

// Handle invalid routes with a 404 error message
app.use((req, res, next) => {
    res.status(404).send("404 - This Page is not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
