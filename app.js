const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');


const authRoutes = require("./Routes/auth");
const userRoutes = require("./Routes/user");
const categoryRoutes = require("./Routes/category");
const productRoutes = require("./Routes/product");
const orderRoutes = require("./Routes/order");

mongoose.connect(process.env.DATABASES,{
    useNewUrlParser:true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB is Connected")
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);


    
app.get('/', (req, res) => {
    return res.send("Hi");
})

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server is Running in port No.${port}`) })