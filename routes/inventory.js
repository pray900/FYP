const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/inventorySearch');
    });
    router.get("/addInv", (req,res)=>{
        res.render('pages/addInv');
    });
    router.get("/addQty", (req,res)=>{
        res.render('pages/addQty');
    });
    return router;
};