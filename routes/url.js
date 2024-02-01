const express =require("express")
const {handleurlpost}= require('../controllers/url')
const router =express.Router();

router.post('/',handleurlpost)