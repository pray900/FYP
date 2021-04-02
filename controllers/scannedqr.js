const express = require('express');
const router = express.Router();
const values = require('../values');
const database = require('../database');
const shopselector = require('../controllers/shopselector');

exports.sendata = (req,res) => {

    const {name, salesprice, invid} = req.body;
    console.log(name, salesprice,invid,"bodies");

    shopselector.currentshop(function(response){
        mainquery1(response)
    });

    var d = new Date();
    var fulldate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();

    function mainquery1(reshopid){
        database.query('select * from customer where shop_id = ? and state = "s"',[reshopid], function (error, result1) {
            if (error) {
                console.log(error);
                res.render('pages/newSales',{name: values.loginusername, datas1: result1,vals: {name: "", saletype: "", date: "", qty: "", salesprice: "", custid: "", profit: "", invid: ""}, datas:"", msg:"error", role: values.role});
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
                            res.render('pages/newSales',{name: values.loginusername, datas: result,vals: {name, saletype: "", date: fulldate, qty: "", salesprice, custid: "", profit: "", invid}, datas1: result1, msg:"", role: values.role});
                        }
                    });
                }
            }
        });
    }

}