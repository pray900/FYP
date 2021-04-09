const jwt = require("jsonwebtoken");
const config = require('./config');
const values = require('./values');

module.exports = (creds = []) => {
    return (req,res,next) => {
        console.log("autn-middleware");

        if(typeof creds === "string"){
            creds = [creds];
        }

        const token = req.headers["auth"];
        if (!values.accesstoken){
            return res.status(401).send("Sorry pal: access denied");
        } else {
            //const tokenBody = token.slice(7);
            jwt.verify(values.accesstoken, config.JWT_SECRET , (err, decoded) => {
                if(err){
                    console.log("JWT error");
                    return res.status(401).send("Error: Access Denied");
                }
                if (creds.length > 0){
                    if(decoded.scopes && decoded.scopes.length && creds.some(match => decoded.scopes.indexOf(match) >= 0)){
                    
                        next();
                    } else {
                        return res.status(401).send("Error: Access Denied");
                    }
                } else {
                    next();
                } 
            });
        }
    }
}