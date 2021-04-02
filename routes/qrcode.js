const express = require('express');
const router = express.Router();
const scannedqr = require('../controllers/scannedqr');

module.exports = () => {
    router.get("/", (req,res)=>{
        res.render('pages/qrscanner');
    });
    
    router.post("/scanned",scannedqr.sendata);
    return router;
};