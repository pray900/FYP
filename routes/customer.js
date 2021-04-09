const express = require('express');
const router = express.Router();
const AddCustomer = require('../controllers/addCustomer');
const EditCustomer = require('../controllers/editCustomer');
const shopselector = require('../controllers/shopselector');
const CustomerSearch = require('../controllers/customersearch');
const custedtdel = require('../controllers/customeredtdel');
const database = require('../database');
const values = require('../values');
const authmdlware = require('./../auth-middleware');

module.exports = () => {
    router.get("/", (req,res)=>{

        shopselector.currentshop(function(response){
            mainquery(response)
        });


        function mainquery(reshopid){
            database.query('select * from customer where shop_id = ? and state = ?',[reshopid,"s"], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default cust sort and search");
                    res.render('pages/customer',{name: values.loginusername, datas: result, msg:"", role: values.role});
                }
            });
        }

        //res.render('pages/customer',{name: values.loginusername});
    });
    router.get("/addCust",authmdlware(["role:Sales","role:Owner"]), (req,res)=>{
        res.render('pages/addCustomer',{name: values.loginusername,vals:{name:"", email:"", number:"", address:""}, msg:"", role: values.role});
    });

    router.post("/search", CustomerSearch.custsrc);

    // router.get("/editCust", (req,res)=>{
    //     res.render('pages/editCust',{name: values.loginusername});
    // });

    router.post("/addCust",authmdlware(["role:Sales","role:Owner"]), AddCustomer.addCustomer);

    router.post("/editcust",authmdlware(["role:Sales","role:Owner"]), EditCustomer.editCustomer);

    router.get("/editbtn/:id",authmdlware(["role:Sales","role:Owner"]), custedtdel.custedit);
    router.get("/deletebtn/:id",authmdlware(["role:Sales","role:Owner"]), custedtdel.custdel);

    return router;
};