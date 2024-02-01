const {nanoid}=require('nanoid')
const URL=require("../models/url")
async function handleurlpost( req, res) {
    const body=req.body;
    if (!body){return res.status(400).json({status:"Url required"})}
    
    const  shortUrl=nanoid(8);
     await URL.create({
        short_Url: shortUrl,
        Redirect_Url:req.body.url,
        visitHistory:[],
    })
     return res.json({id:short_Url})
}