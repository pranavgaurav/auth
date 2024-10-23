const express=require('express');

const app=express();
require('dotenv').config();
const cookieParser=require("cookie-parser");
// MIDDLE WARE use  to parse the req body
app.use(express.json());

app.use(cookieParser());

app.listen(process.env.port,()=>
{
    console.log("SERVER STARTED");
})


require("./config/database").connect();
const router=require("./routes/route");
app.use("/base",router);

