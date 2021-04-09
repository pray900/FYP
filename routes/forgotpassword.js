const express = require('express');
const router = express.Router();
const forgotpassword = require('../controllers/forgotpassword');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/forgotpassword',{msg: ""});
    });

    router.post("/forgotpasswordpost", forgotpassword.forgotpassword);
    
    return router;
}