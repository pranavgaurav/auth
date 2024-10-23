const User=require("../model/User");

const bcrypt=require("bcrypt");
// 1. input name,email,pass,role
// 2. check if user already exist
// 3. hash the pass
// 4. Create and save user



exports.signup=async(req,resp)=>
{
    try
    {
        const {name,email,pass,role}=req.body;

        const ispresent=await User.findOne({email});

        if(ispresent)
        {
            return resp.status(400).json({
                success:false,
                msg:"User Already Exsits"
            })
        }
        let hp;
        try
        {
            hp=await bcrypt.hash(pass,10);
        }
        catch(err)
        {
            console.log(err.message);
            return resp.status(500).json({
                success:false,
                msg:"Error in Hashing Pass"
            })
        }

        const user=await User.create(
            { name,role,email,pass:hp}
        )

        return resp.status(201).json({
            success:true,
            msg:"USER CREATED",
            data:user,
        })
    }
    catch(err)
    {
        console.log(err);
        resp.status(500).json({
            success:false,
            msg:"INTERNAL SERVER ERROR"
        })
    }
}