const express = require('express');
const router = express.Router();
const changepwd = require('../controllers/changepwd');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/changepwd',{msg:""});
    });
    router.post("/changepwdpost", changepwd.newpwd);
    return router;
};