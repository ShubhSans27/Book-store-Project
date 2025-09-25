const router = require("express").Router();
const { status } = require("init");
const middlewear = require('../Middlewear/authenticationMiddle')
const Book = require('../Model/book');
const Order = require('../Model/order');
const User = require('../Model/User');


router.post("/placed-order", middlewear, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id }
      });
    }

    return res.json({
      status: "success",
      message: "Order is placed"
    });

  } catch (err) {
    console.error("Placed Order Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// router.get("/get-all-order",  middlewear , async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user")  
//       .populate("book")   
//       .sort({ createdAt: -1 }); 

//     return res.json({
//       status: "success",
//       data: orders,
//     });
//   } catch (err) {
//     console.error("Order History Error:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

  router.get ( '/get-all-history' , middlewear , async (req, res) => {
   try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
            .populate("book")
            .populate("user", "name email");

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong while fetching orders" });
    }
});


router.put ("/update-status/:id" , middlewear , async(req , res ) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id ,{status : req.body.status});
        return res.json({
            status : "Success",
            msg : "status Updated "
        })

    } catch (err) {
    console.error("CartAdd Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
} )



module.exports = router;