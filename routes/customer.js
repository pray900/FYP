const express = require('express');
const router = express.Router();
const AddCustomer = require('../controllers/addCustomer');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/customerSearch');
    });
    router.get("/addCust", (req,res)=>{
        res.render('pages/addCustomer');
    });
    router.get("/editCust", (req,res)=>{
        res.render('pages/editCust');
    });
    router.post("/addCust", AddCustomer.addCustomer);
    return router;
};