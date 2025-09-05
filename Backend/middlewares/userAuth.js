const jwt = require('jsonwebtoken');

exports.userAuth = (req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                message: "No token Provided"
            });
        }

        const token = authHeader.split('')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        console.log("Invalid Token",err);
        res.status(401).json({
            message: "Invalid Token "
        });
    }
}