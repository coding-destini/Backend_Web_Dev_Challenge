const mongoose = require('mongoose');
const URL = "mongodb+srv://akashshah:1234@event.9dtcfi9.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error in connecting to MongoDB",err);
})