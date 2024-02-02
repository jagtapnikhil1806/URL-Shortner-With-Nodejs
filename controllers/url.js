const shortid = require('shortid');

const URL=require("../models/url")
async function handleurlpost( req, res) {
    const body=req.body;
    if (!body)return res.status(400).json({status:"Url required"})
    
    const  shortUrl= shortid.generate(8);
     await URL.create({
        short_Url: shortUrl,
        Redirect_Url:req.body.url,
        visitHistory:[],
    })
     return res.json({id:shortUrl})
}

module .exports ={handleurlpost,}