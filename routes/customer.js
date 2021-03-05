const express = require('express');
const router = express.Router();
const AddCustomer = require('../controllers/addCustomer');
const EditCustomer = require('../controllers/editCustomer');
const shopselector = require('../controllers/shopselector');
const CustomerSearch = require('../controllers/customersearch');
const database = require('../database');
const values = require('../values');

module.exports = () => {
    router.get("/", (req,res)=>{

        shopselector.currentshop(function(response){
            mainquery(response)
        });


        function mainquery(reshopid){
            database.query('select * from customer where shop_id = ?',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default cust sort and search");
                    res.render('pages/customer',{name: values.loginusername, datas: result, msg:""});
                }
            });
        }

        //res.render('pages/customer',{name: values.loginusername});
    });
    router.get("/addCust", (req,res)=>{
        res.render('pages/addCustomer',{name: values.loginusername, msg:""});
    });

    router.post("/search", CustomerSearch.custsrc);

    // router.get("/editCust", (req,res)=>{
    //     res.render('pages/editCust',{name: values.loginusername});
    // });

    router.post("/addCust", AddCustomer.addCustomer);

    router.post("/editcust", EditCustomer.editCustomer);

    return router;
};