const express = require('express');
const router = express.Router();
const AddInventory = require('../controllers/addInventory');

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
    router.post("/addInv", AddInventory.addInv);
    return router;
};