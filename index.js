const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Home route
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Instagram route with dynamic username
app.get("/ig/:username", (req, res) => {
    const instadata = require("./data.json");      // ✅ load JSON file
    const { username } = req.params;               // ✅ extract from URL

    console.log("username from URL:", username);   // ✅ now it's defined
    console.log("Available users:", Object.keys(instadata)); // Debug available users

    const userData = instadata[username];          // ✅ get specific user data

    if (userData) {
        res.render("instagram.ejs", { data: userData });  // ✅ render with user data
    } else {
        res.status(404).send("User not found");     // ✅ show 404 if not found
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
