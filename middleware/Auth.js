// auth who are you
// PAYLOAD -> id,email,role
const jwt=require("jsonwebtoken");
require("dotenv").config()
exports.auth=(req,resp,next)=>
{
    try
    {
        // const token=req.body.token;
        // const token=req.cookies.token;

        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxpb25AZ21haWwuY29tIiwiaWQiOiI2NzE0ZTkwZjA0NTJhNjZhY2VkZDE0OTkiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Mjk0MjM5MDh9.zg2aUl1RLwM8_5QBSFRhkAqx2enJHL2B1_tZEqkyuzc
        const token=req.header("Authorization").replace("Bearer ","");
        if(!token || token==undefined)
        {
            return resp.status(401).json(
                {
                    message:"Token Missing"
                });
        }
        try
        {
            const payload=jwt.verify(token,process.env.secret);
            req.user=payload;
        }
        catch(err)
        {
            return resp.status(401).json(
                {
                    message:"Token MisMatch"
                });
        }
        next();
    }
    catch(err)
    {
        req.status(500).json({
            msg:"INTERNAL SERVER ERROR"
        })
    }
}


exports.isStudent=(req,resp,next)=>
{
    try
    {
        if(req.user.role==="STUDENT")
            next();
        else
        {
            resp.status(404).json({
                success:false,
                msg:"YOU ARE NOT ALLOWED TO ACCESS THIS PAGE"
            })
        }
    }
    catch(err)
    {
        return resp.status(500).json({
            success:false,
            msg:"INTERNAL SERVER ERROR"
        })
    }
}

// WRITE A MIDDLE TO ACCESS A PROTECTED ROUTE WHERE ONLY TEACHER AND ADMIN ARE ALLOWED

exports.isMng=(req,resp,next)=>
    {
        try
        {
            if(req.user.role==="Teacher" || req.user.role==="ADMIN")
                next();
            else
            {
                resp.status(404).json({
                    success:false,
                    msg:"YOU ARE NOT ALLOWED TO ACCESS THIS PAGE"
                })
            }
        }
        catch(err)
        {
            return resp.status(500).json({
                success:false,
                msg:"INTERNAL SERVER ERROR"
            })
        }
    }
    