
const User = require('../Model/User');
require('../Model/book')
;

const addFavBook = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "User ID and Book ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favourites.includes(bookId)) {
      user.favourites.push(bookId);
      await user.save();
    }

    res.status(200).json({ message: "Book added to favourites", favourites: user.favourites });
  } catch (error) {
    console.error("Error adding favourite:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addFavBook };




const deleteBook = async (req , res ) => {

      try {
        const {bookid , id } = req.headers;
        const userData = await User.findById(id);
        const isBookFav = userData.favourites.includes(bookid);
        if(isBookFav) {
               await User.findByIdAndUpdate(id , {$pull : {favourites : bookid}});
        }
        
        return res.status(200).json({ msg : "Book removed from Favourate "})

    } catch(err) {
         console.error(err); 
         res.status(500).json({ message: "Internal Server Error" });
    }
}



const getFavBook = async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ status: "error", message: "User ID is missing in headers" });
    }

    const userData = await User.findById(id).populate("favourites");

    if (!userData) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const favouritesBook = userData.favourites;

    return res.status(200).json({ status: "success", data: favouritesBook });

  } catch (err) {
    console.error("Error in getFavBook:", err.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};




module.exports = { addFavBook , deleteBook , getFavBook }
