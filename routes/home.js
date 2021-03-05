const express = require('express');
const router = express.Router();
const values = require('../values');
const shoplist = require('../controllers/shopselector');
const database = require("../database");

module.exports = () => {
    router.get("/", (req,res)=>{
        //shoplist.dispshop;
        //var datas;
        database.query('select * from shop', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                //values.dispshoplist = result;
                //res.redirect('/home');
                //res.next();
                values.defaultshopid = result[0].Shop_id;
                values.defaultshopname = result[0].Name;
                console.log(values.defaultshopname + " "+ values.defaultshopid+ " default shop name and id");
                res.render('pages/home', {name: values.loginusername, shoplist1: result, defshop: result[0].Name, selectedshop: values.submittedshop});
            }
        });

        //console.log(values.dispshoplist+ "   shoplist");
        //console.log(datas+ "   shoplist");
        //res.render('pages/home', {message: values.loginusername, shoplist1: values.dispshoplist});
    });

    return router;
};