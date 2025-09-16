const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.get("/",(req,res)=>{
    res.status(200).send("Burası Anasayfa");
})



app.listen(PORT,()=>{
console.log(`App is working on ${PORT}`);
})