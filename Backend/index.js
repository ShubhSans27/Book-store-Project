const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();
require("./Model/dbConn");
const user = require('./Routes/user')
const admin = require('./Routes/book')
const fav = require('./Routes/favourate')
const cart = require('./Routes/cart')
const Order = require('./Routes/order')
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.use('/api/v1' , user);
app.use('/api/v2' , admin )
app.use('/api/v3' , fav )
app.use('/api/v4' , cart)
app.use('/api/v5' , Order)


app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`)
})