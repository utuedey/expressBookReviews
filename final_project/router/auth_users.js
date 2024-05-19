const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const { password } = require('./usersdb.js');
const regd_users = express.Router();

let users = [ {
  username: "user1",
  password: "user12345"
}];

const JWT_SECRET = "aVeryVerySecretString";

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
if (users[username]) {
  return True
};
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
if (username === users[username] && password === users[password]) {
  return True
};
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username, password} = req.body;

  if (isValid(username) && authenticatedUser(username, password)) {
    return res.json({
      token: jwt.sign({ username }, JWT_SECRET, { expiresIn: "1hr" })
    });
  }
    return res.status(200).json({message: "Login successful"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
