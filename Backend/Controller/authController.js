
const User = require('../Model/User');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here"; 

const signUp = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    const existing = await User.findOne({ email: email }); 
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
      address: address
    });

    await newUser.save();
    return res.status(200).json({ msg: "Signup successful" });

  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

   
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      msg: "Login successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.headers["id"];

    if (!id || id === "undefined") {
      return res.status(400).json({ message: "User ID is missing or invalid in headers" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error in getUser:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





const updateUser = async (req ,res ) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id , {address: address});
        return res.status(200).json({msg : "Adress  Updated succesfully "})

    } catch(err) {
         console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    signUp ,
    signIn , 
    getUser ,
    updateUser
}
