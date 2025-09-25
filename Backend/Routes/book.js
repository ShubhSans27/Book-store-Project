const router = require("express").Router();

const {addBook  , updateBook, deleteBook, getAllBook, getRecentBook, getBookById, } = require('../Controller/bookController');
const middlewear = require('../Middlewear/authenticationMiddle')


router.post('/add-book', middlewear ,  addBook )
router.put('/update-book' , middlewear , updateBook)
router.delete('/delete-book' , middlewear , deleteBook)
router.get('/get-all-book', getAllBook)
router.get('/get-recent-books' , getRecentBook)
router.get('/get-book-by-id/:id' , getBookById)



module.exports = router