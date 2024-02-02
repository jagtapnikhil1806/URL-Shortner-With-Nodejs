const express= require("express");
const {connectMongoDB}=require("./connection")
const  urlRouter=require('./routes/url')
const URL =require('./models/url')
const app=express();
const PORT=3000;

connectMongoDB("mongodb://127.0.0.1:27017/URL_Shortner").
then(()=>{
    console.log("connected to MongoDB");
}).catch((err)=>{
    console.error(err);



});

app.use(express.json());
//routes

app.use('/url',urlRouter)
app.get('/:shortid', async (req, res) => {
    const shortId = req.params.shortid;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // This ensures that the updated document is returned
        );

        if (entry ) {
            res.redirect(entry.Redirect_Url);
        } else {
            // Handle the case where entry or Redirect_Url is null or undefined
            console.error("The object is null or Redirect_Url is not defined");
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).send('Internal Server Error');
    }
});


// app.get('/:shortid',async (req,res)=>{
//     let shortId = req.params.shortid;
//     const entry=await URL.findOneAndUpdate(
//         {
//         shortId,
//     },
//     {
//         $push:{
//             visitHistory:{
//                 timestamp:Date.now()
//             },
//         },

//     },
//     );
//     console.log(entry)
//     if (entry !== null) {
//         // Access 'Redirect_Url' property here
//         console.log(entry.Redirect_Url);
//     } else {
//         console.error("The object is null");
//     }
    
      

// });

// app.get('/:shortid', async (req, res) => {
//     let shortId = req.params.shortid;

//     try {
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             { $push: { visitHistory: { timestamp: Date.now() } } },
//             { new: true } // This ensures that the updated document is returned
//         );

//         if (entry && entry.Redirect_Url) {
//             res.redirect(entry.Redirect_Url);
//         } else {
//             // Handle the case where entry or Redirect_Url is null or undefined
//             res.status(404).send('Not Found');
//         }
//     } catch (error) {
//         console.error('Error updating document:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})