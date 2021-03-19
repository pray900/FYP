const express = require('express');
const router = express.Router();
const AddInventory = require('../controllers/addInventory');
const InventorySearch = require('../controllers/inventorysearch');
const InventoryEdit = require('../controllers/inventoryedit');
const shopselector = require('../controllers/shopselector');
const invedtdel = require('../controllers/inventoryedtdel');
const values = require('../values');
const database = require('../database');

module.exports = () => {
    router.get("/", (req,res)=>{

        
        shopselector.currentshop(function(response){
            mainquery(response)
        });


        function mainquery(reshopid){
            database.query('select * from inventory where shop_id = ?',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/inventory',{name: values.loginusername, datas: result, msg:""});
                }
            });
        }

        // database.query('select * from inventory where shop_id = ?',[], function (error, result) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log(result[0]+ " default inv sort and search");
        //         res.render('pages/inventory',{name: values.loginusername, datas: result});
        //     }
        // });
        //res.render('pages/inventory',{name: values.loginusername});

    });

    router.get("/addInv", (req,res)=>{
        res.render('pages/addInv',{name: values.loginusername,msg:"",vals: {name :"", invtype: "", supplier: "", costprice: "", quantity:"", salesprice:""}});
    });

    router.post("/search", InventorySearch.invsrc);

    router.post("/editInv", InventoryEdit.invedit);

    router.post("/addInv", AddInventory.addInv);


    // router.get("/addQty", (req,res)=>{
    //     res.render('pages/addInv',{name: values.loginusername});
    //     res.render('pages/addInvQuantity',{name: values.loginusername});
    // });
    router.get("/addqtybtn/:id", invedtdel.invedit);
    router.get("/deletebtn/:id", invedtdel.invdel);
    router.get("/historybtn/:id", invedtdel.invhist);


    return router;
};