const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const fs = require('fs');
const path = require('path');


const app = express();
const port = 3000;
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpw",
  database: "Aniblix",
  port: 3409
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + connection.threadId);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error executing MySQL query: " + error.message);
        res.status(500).send("Internal server error");
        return;
      }

      if (results.length > 0) {
        console.log("User already exists.");
        res.status(400).send("User already exists");
        return;
      }

      // Insert new user into the database
      connection.query(
        "INSERT INTO user (email, password) VALUES (?, ?)",
        [email, password],
        (error, results) => {
          if (error) {
            console.error("Error executing MySQL query: " + error.message);
            res.status(500).send("Internal server error");
            return;
          }

          console.log(`User ${email} created successfully!`);
          res.status(201).send("User created successfully");
        }
      );
    }
  );
});

// Add this route to your server.js
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) {
        console.error("Error executing MySQL query: " + error.message);
        res.status(500).send("Internal server error");
        return;
      }

      if (results.length > 0) {
        console.log("User logged in successfully!");
        res.status(200).json({ message: "User logged in successfully" });
      } else {
        const errorMessage = "User is not there.";
        console.log(errorMessage);
        res.status(404).json({ error: errorMessage });
        return;
      }
    }
  );
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

function insertImage(movie_id, title, release_date, imagePath, subtitle) {
  // Check if the entry already exists
  const checkQuery = "SELECT 1 FROM upcoming WHERE movie_id = ?";
  connection.query(checkQuery, [movie_id], (error, results) => {
    if (error) throw error;

    // If the entry does not exist, proceed with the insertion
    if (results.length === 0) {
      const query = "INSERT INTO upcoming (movie_id, title, release_date, movie_img, subtitle) VALUES (?, ?, ?, ?, ?)";
      connection.query(query, [movie_id, title, release_date, imagePath, subtitle], (error, results) => {
        if (error) throw error;
        console.log("Image inserted successfully!");
      });
    } else {
      console.log("Entry already exists, no new entry inserted.");
    }
  });
}


// Example usage
insertImage(100000, "City Hunter", "2024-04-05", "./iMAGES/wp5536073.jpg", "Private Eyes");

app.get('/fetch-movies', (req, res) => {
  const query = "SELECT * FROM upcoming";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/movie-details', (req, res) => {
  const movie_id = req.body.movie_id;
  const query = "SELECT * FROM details WHERE movie_id = ?";
  connection.query(query, [movie_id], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.message);
      res.status(500).send("Internal server error");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Movie not found");
      return;
    }
    res.json(results[0]); // Assuming there's only one movie with the given movie_id
  });
});

app.post('/movie-details1', (req, res) => {
  const movie_id = req.body.movie_id;
  const query = "SELECT * FROM cast WHERE movie_id = ?";
  connection.query(query, [movie_id], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.message);
      res.status(500).send("Internal server error");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Crew not found");
      return;
    }
    res.json(results); // Assuming there's only one movie with the given movie_id
  });
});

app.post('/movie-details2', (req, res) => {
  const movie_id = req.body.movie_id;
  const query = "SELECT * FROM crew WHERE movie_id = ?";
  connection.query(query, [movie_id], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.message);
      res.status(500).send("Internal server error");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("Crew not found");
      return;
    }
    res.json(results); // Assuming there's only one movie with the given movie_id
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
