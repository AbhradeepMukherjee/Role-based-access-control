const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const authenticate = async ( req, res, next ) => { 
    const token = req.cookies.token;
    console.log("token", token);
    if(!token){
        return res.status(401).json({message: "Unauthorised"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    }catch(err){
        res.status(401).json({ message: 'Invalid Token' });
        console.log(err);
    }
}

module.exports = authenticate;