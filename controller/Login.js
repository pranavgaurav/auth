// 1.check that both email and pass is entered
// 2.check if user exists or not
// 3.check if password is correct or not
// 4.Login+ COOKIE(JWT)
const User=require("../model/User");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');

require("dotenv").config();

exports.login=async(req,resp)=>
{
    try
    {
        const {email,pass}=req.body;
        if(!email || !pass)
        {
            return resp.status(400).json({
                success:false,
                msg:"Please Fill All the Details"
            })
        }
        let user=await User.findOne({email})
        if(!user)
        {
            return resp.status(400).json({
                success:false,
                msg:" Pls Create Account "
            })
        }

        
        if(await  bcrypt.compare(pass,user.pass))
        {
           
            // LOGIN
            let payload={
                email:user.email,
                id:user._id,
                role:user.role,
            }
            let options={
                httpOnly:true,
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
            }
            let token=jwt.sign(payload,process.env.secret);
            resp.cookie("token",token,options).status(200).json({
                success:true,
                msg:"Login Successfull",
                token,
                user,
            }) 
        }
        else
        {
            resp.status(400).json({
                success:false,
                msg:"Password Incorrect"
            })
        }
    }
    catch(err)
    {
        resp.status(500).json({
            success:false,
            msg:"INTERNAL SERVER ERROR"
        })
    }
}
