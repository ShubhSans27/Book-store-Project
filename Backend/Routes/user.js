const router = require("express").Router();
const {signUp , signIn , getUser , updateUser} = require('../Controller/authController')
const middlewear = require('../Middlewear/authenticationMiddle')


router.post('/sign-up' ,  signUp )
router.post('/sign-in' , signIn)
router.get('/get-user-information' , middlewear , getUser )
router.put('/update-user' , middlewear , updateUser )


module.exports = router;