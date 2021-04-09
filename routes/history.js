const express = require('express');
const router = express.Router();
const values = require('../values');
const database = require('../database');

module.exports = () => {

    router.get("/", (req,res)=>{
        res.render('pages/history');
    });

    return router;
};