//  MiddleWare is nothing but it stores all the json web tokens(jwt) in the request in the headers and verifies them 
// and store them the browsersite local storage 
//  If the token is valid, it allows the request to proceed to the next middleware or route handler


const jwt = require('jsonwebtoken');

export const adminAuth = (req,res, next) => {
    const token = req.headers['Authorization']?.split(' ')[1] // Bearer token
    if(!token){
        return res.status(401).json({
            message: "Access Denied No token is provided"
        });
    } try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;  // Decoded Info like {id,email,role}
        next(); //pass req to the next handler
    }catch (err){
        console.log("Invalid token",err)
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}