const express = require('express');
const Book = require('../models/Book.model');
const router = express.Router();

/* GET home page */
router.get("/books", (req, res, next) => {
    Book.find()
        .then((booksArr) => {
            res.render("books/book-list", { books: booksArr })

        })
        .catch(e => {
            // console.log(e);
            next(e);
        })
});


//GET /books/create
router.get("/books/create", (req, res, next) => {
    res.render("books/create");
});

// POST books
router.post("/books", (req, res, next) => {
    console.log(req.body);
    const bookDetails = {
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        description: req.body.description
    }

    Book.create(bookDetails)
        .then(bookFromDB => {
            res.redirect("/books")
        })
        .catch(e => {
            // console.log(e);
            next(e);
        })
})

//GET /books/:bookId
router.get("/books/:bookId", (req, res, next) => {

    const { bookId } = req.params;

    Book.findById(bookId)
        .then(bookDetails => {
            res.render("books/book-details", bookDetails);
        })
        .catch(e => {
            console.log("error getting book details from DB", e);
            next(e);
        });

});




module.exports = router;