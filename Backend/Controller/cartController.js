const { status } = require('init');
const User = require('../Model/User')

const CartAdd = async (req, res) => {
  try {
    const userId = req.headers.id;
    const bookId = req.headers.bookid;

    if (!userId || !bookId) {
      return res.status(400).json({ msg: "Missing user ID or book ID in headers" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!Array.isArray(user.cart)) {
      user.cart = [];
    }

    const isBookInCart = user.cart.some(
      (item) => item.toString() === bookId.toString()
    );

    if (isBookInCart) {
      return res.status(200).json({ msg: "Book is already in cart" });
    }

    user.cart.push(bookId);
    await user.save();

    return res.status(200).json({ msg: "Book has been added to cart" });
  } catch (err) {
    console.error("CartAdd Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const CartDelete = async (req, res) => {
  try {
     const {bookid } = req.params;
     const {id} = req.headers;
     await User.findByIdAndUpdate(id , {
        $pull : {cart : bookid}
     });
     return res.json({
        status : "success",
        msg : "Book removerd"
     })

  } catch (err) {
    console.error("CartDelete Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getCartBooks = async (req, res) => {
  try {
    const userId = req.headers.id;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID is missing in headers" });
    }

    const user = await User.findById(userId).populate("cart");

    if (!user || !user.cart) {
      return res.status(404).json({ status: "error", message: "User not found or no cart" });
    }

    res.status(200).json({
      status: "success",
      data: user.cart, // cart is populated with book data
    });

  } catch (error) {
    console.error("getCartBooks Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { CartAdd, CartDelete , getCartBooks };