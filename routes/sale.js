const express = require('express');
const router = express.Router();
const values = require('../values');
const database = require('../database');
const shopselector = require('../controllers/shopselector');
const AddSales = require('../controllers/addsales');
const SaleSearch = require('../controllers/salesearch');
const salesdel = require('../controllers/salesdel');

const authmdlware = require('./../auth-middleware');

module.exports = () => {

    router.get("/", (req,res)=>{

        shopselector.currentshop(function(response){
            mainquery(response)
        });


        function mainquery(reshopid){
            database.query('select * from sales where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/sales',{name: values.loginusername, datas: result, msg:"", role: values.role});
                }
            });
        }

        //res.render('pages/sales',{name: values.loginusername});
    });

    var d = new Date();
    var fulldate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
    router.get("/newSale",authmdlware(["role:Sales","role:Owner"]), (req,res)=>{

        shopselector.currentshop(function(response){
            mainquery1(response)
        }); 
    
        function mainquery1(reshopid){
            database.query('select * from customer where shop_id = ? and state = "s"',[reshopid], function (error, result1) {
                if (error) {
                    console.log(error);
                    res.render('pages/newSales',{name: values.loginusername, datas1: result1, datas:"", msg:"error", vals: {name: "", saletype: "", date: fulldate, qty: "",totalprice:"", salesprice: "", custid: "", invid: ""}, role: values.role});
                } else {
                    console.log(result1[0]+ " default sales cust");
    
                    shopselector.currentshop(function(response){
                        mainquery(response)
                    });
             
                    function mainquery(reshopid){
                        database.query('select * from inventory where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(result[0]+ " default inv sort and search");
                                res.render('pages/newSales',{name: values.loginusername,vals: {name: "", saletype: "", date: fulldate, qty: "", salesprice: "", custid: "", totalprice:"", invid: ""}, datas: result, datas1: result1, msg:"", role: values.role});
                            }
                        });
                    }
    
                    //res.render('pages/sales',{name: values.loginusername, datas1: result1, datas:, msg:""});
                }
            });
        }

        //res.render('pages/newSales',{name: values.loginusername, msg:""});
    });

    router.post("/addsales",authmdlware(["role:Sales","role:Owner"]), AddSales.newsales);

    router.get("/deletebtn/:id",authmdlware(["role:Sales","role:Owner"]), salesdel.salesdel);

    router.post("/search", SaleSearch.salesrc);

    return router;
};