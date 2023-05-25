const express = require('express')
const app = express();
const PORT = 2000;
const db = require('./config/mongoose')


app.use(express.urlencoded());

app.use("/",require('./routes/index'));

app.listen(PORT,(error)=>{
if(error){console.log("error in server port", PORT)}
console.log("Server is running on port",PORT)
})