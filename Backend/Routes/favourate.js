const router = require("express").Router();

const{ addFavBook  , deleteBook , getFavBook} = require("../Controller/favouratConn");
const middlewear = require('../Middlewear/authenticationMiddle');


router.put('/add-favourat' , middlewear ,addFavBook );
router.delete('/remover-favourat' , middlewear , deleteBook );
router.get('/add-favbook' , middlewear , getFavBook)


module.exports = router;