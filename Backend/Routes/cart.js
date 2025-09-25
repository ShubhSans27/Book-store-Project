const router = require("express").Router();
const { CartAdd , CartDelete, getCartBooks}  = require('../Controller/cartController') 
const middlewear = require("../Middlewear/authenticationMiddle");



router.put('/add-cart', middlewear, CartAdd );
router.delete('/remove-cart', CartDelete);
router.get('/get-cart-books' ,middlewear ,  getCartBooks)


module.exports = router;