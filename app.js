const express = require('express');

const app = express();
const port = 3000;

require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASES,{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB is Connected")
})
    
app.get('/', (req, res) => {
    return res.send("Hi");
})
app.listen(port, () => { console.log(`Server is Running in port No.${port}`) })