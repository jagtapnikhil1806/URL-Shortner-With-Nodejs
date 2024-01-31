const mongoose=require("mongoose");

const urlSchema = mongoose.Schema({
    short_Url:{
        type: String,
        required:true,
        unique:true
    
    },
    Redirect_Url:{
        type :String ,
        required: true
    },
    visitHistory:[{timestamp:{
        type:number
    }}]
},{timestamps:true});

const URL=mongoose.model("url",urlSchema);

module.exports=URL;