const mongoose = require('mongoose');
const User = require('../Model/User');
const Book = require('../Model/book')

const addBook = async (req, res) => {
  try {
    console.log("Inside addBook");

    if (!req.user || !req.user.id) {
      console.log("No user found in token");
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const { id } = req.user;
    console.log("User ID from token:", id);

    const user = await User.findById(id);
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      console.log("User is not admin:", user.role);
      return res.status(403).json({ message: "Only admin can add books" });
    }

    console.log("Creating new book with data:", req.body);

    const newBook = new Book({
      bookId: new mongoose.Types.ObjectId().toString(),
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await newBook.save();

    console.log("Book saved successfully");

    return res.status(201).json({ message: "Book added successfully", book: newBook });

  } catch (err) {
    console.error("Add book error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const updateBook = async (req , res ) => {
    try {
        const { bookid } = req.headers;
       await Books.findByIdAndUpdate(bookid ,   {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language
        });
       return   res.status(200).json({msg : "Book Updated Successfully"})

    } catch(err) {
         console.error(err); 
         res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteBook = async (req , res ) => {
    try {
        const {bookid} = req.headers;
        await Books.findByIdAndDelete(bookid);
        return res.status(200).json({ msg : "Succesfull deleted"})

    }catch(err) {
         console.error(err); 
         res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: "Success",
      data: books
    });

  } catch (err) {
    console.error("Error in getAllBook:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecentBook = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(4);

    return res.status(200).json({
      status: "Success",
      data: books,
    });

  } catch (err) {
    console.error("Error in getRecentBook:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      status: "Success",
      data: book,
    });

  } catch (err) {
    console.error("Error in getBookById:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {addBook ,
                  updateBook , 
                  deleteBook ,
                  getAllBook ,
                  getRecentBook ,
                  getBookById
}