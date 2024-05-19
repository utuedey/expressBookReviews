const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  // check if both username and password are provided
  if (!username || !password ) {
    return res.status(400).json({ message: "Username and Password are required! "})
  }

  // check if username already exist
  if (users[username]) {
    return res.status(400).json({message: "Username already exist"})
  }

  // Register new user
  users[username] ={ password };

  return res.status(201).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const book_list = books
  return res.status(200).json(book_list);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const book_isbn = req.params.isbn
  const book = books[book_isbn]
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const book_author = req.params.author;
  // Get all the keys of the book object
  let keys = Object.keys(books)
  keys.forEach(key => {
    if (books[key].author === book_author) {
      const authors_book =  {"isbn": key, "Title":books[key].title, "reviews": books[key].reviews}
      return res.status(200).json(authors_book);
    }
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const book_title = req.params.title;
  // Get all the keys of the book object
  let keys = Object.keys(books)
  keys.forEach(key => {
    if (books[key].title === book_title) {
      const authors_title = {"isbn": key, "Author":books[key].author, "reviews": books[key].reviews}
      return res.status(200).json(authors_title);
    }
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const books_isbn = req.params.isbn;
  const book_review = books[books_isbn].reviews;
  return res.status(200).json(book_review);
});

module.exports.general = public_users;
