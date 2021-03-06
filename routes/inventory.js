const express = require('express');
const router = express.Router();
const AddInventory = require('../controllers/addInventory');
const InventorySearch = require('../controllers/inventorysearch');
const InventoryEdit = require('../controllers/inventoryedit');
const shopselector = require('../controllers/shopselector');
const invedtdel = require('../controllers/inventoryedtdel');
const values = require('../values');
const database = require('../database');
const authmdlware = require('./../auth-middleware');

module.exports = () => {
    router.get("/", (req,res)=>{

        
        shopselector.currentshop(function(response){
            mainquery(response)
        });


        function mainquery(reshopid){
            database.query('select * from inventory where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/inventory',{name: values.loginusername, datas: result, msg:"", role: values.role});
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

    router.get("/addInv",authmdlware(["role:Inventory","role:Owner"]), (req,res)=>{
        res.render('pages/addInv',{name: values.loginusername,msg:"",pic:"",vals: {name :"", invtype: "", supplier: "", costprice: "", quantity:"", salesprice:""}, role: values.role});
    });

    router.post("/search", InventorySearch.invsrc);

    router.post("/editInv",authmdlware(["role:Inventory","role:Owner"]), InventoryEdit.invedit);

    router.post("/addInv",authmdlware(["role:Inventory","role:Owner"]), AddInventory.addInv);


    // router.get("/addQty", (req,res)=>{
    //     res.render('pages/addInv',{name: values.loginusername});
    //     res.render('pages/addInvQuantity',{name: values.loginusername});
    // });
    router.get("/addqtybtn/:id",authmdlware(["role:Inventory","role:Owner"]), invedtdel.invedit);
    router.get("/deletebtn/:id",authmdlware(["role:Inventory","role:Owner"]), invedtdel.invdel);
    router.get("/historybtn/:id", invedtdel.invhist);


    return router;
};