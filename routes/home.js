const express = require('express');
const router = express.Router();
const values = require('../values');
//const shoplist = require('../controllers/shopselector');
const shopselector = require('../controllers/shopselector');
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

                totalsales(setsalesValue);
                totalcustomer(setcustomerValue);
                totalinventory(setinventoryValue);
                totalogs(setlogsValue);
                
                console.log(ts,tc,ti,tl," tc are");

                values.defaultshopid = result[0].Shop_id;
                values.defaultshopname = result[0].Name;
                console.log(values.defaultshopname + " "+ values.defaultshopid+ " default shop name and id");

                shopselector.currentshop(function(response){
                    mainquery(response)
                });  
        
                function mainquery(reshopid){
                    database.query('select * from inventory where shop_id = ? and quantity < 60',[reshopid], function (error, result1) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(result1[0]+ " default inv sort and search");
                            //res.render('pages/inventory',{name: values.loginusername, datas: result, msg:""});
                            res.render('pages/home', {name: values.loginusername, shoplist1: result, defshop: result[0].Name, datas: result1, selectedshop: values.submittedshop, ts: ts, tc: tc, ti: ti, tl: tl});
                        }
                    });
                }

                //res.render('pages/home', {name: values.loginusername, shoplist1: result, defshop: result[0].Name, selectedshop: values.submittedshop, ts: ts, tc: tc, ti: ti, tl: tl});
            }
        });

        //console.log(values.dispshoplist+ "   shoplist");
        //console.log(datas+ "   shoplist");
        //res.render('pages/home', {message: values.loginusername, shoplist1: values.dispshoplist});
    });
    var ts;
    var tc;
    var ti;
    var tl;

    function totalsales(callback){
        database.query('select count(sales_id) as sumres from sales', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0].sumres+" totalsumres");
                callback(result[0].sumres);                 
            }
        });
    }    
    function setsalesValue(value) {
        ts = value;
    }

    function totalprofit(callback){
        
    }

    function totalcustomer(callback){
        database.query('select count(customer_id) as sumres from customer', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0].sumres+" totalsumres");
                callback(result[0].sumres);
            }
        });
    }
    function setcustomerValue(value) {
        tc = value;
    }

    function totalinventory(callback){
        database.query('select count(inv_id) as sumres from inventory', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0].sumres+" totalsumres");
                callback(result[0].sumres);
            }
        });
    }
    function setinventoryValue(value) {
        ti = value;
    }

    function totalogs(callback){
        database.query('select count(Log_id) as sumres from logs', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0].sumres+" totalsumres");
                callback(result[0].sumres);
            }
        });
    }
    function setlogsValue(value) {
        tl = value;
    }



    return router;
};