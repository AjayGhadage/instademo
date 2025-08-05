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
    const instadata = require("./data.json");      
    const { username } = req.params;              

    console.log("username from URL:", username);   
    console.log("Available users:", Object.keys(instadata)); 

    const userData = instadata[username];         

    if (userData) {
        res.render("instagram.ejs", { data: userData }); 
    } else {
        res.status(404).send("User not found");     
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
