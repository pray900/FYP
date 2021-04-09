const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/addUser');
const RegisterSearch = require('../controllers/registersearch');
const RegisterEdit = require('../controllers/registeredit');
const regedtdel = require('../controllers/registeredtdel');
const values = require('../values');
const database = require('../database');
const authmdlware = require('./../auth-middleware');

module.exports = () => {
    router.get("/",authmdlware(["role:Owner"]), (req,res)=>{

            database.query('select * from login where state = "s"', function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default register sort and search");
                    res.render('pages/register',{name: values.loginusername, datas: result, msg:""});
                }
            });

        //res.render('pages/register',{name: values.loginusername});
    });
    router.get("/addUser",authmdlware(["role:Owner"]), (req,res)=>{
        res.render('pages/addRegister',{name: values.loginusername, msg: "", vals:{name:"", email:"", username:"", type:""}});
    });

    router.post("/search", RegisterSearch.regsrc);

    router.post("/edit",authmdlware(["role:Owner"]), RegisterEdit.regedit);

    // router.get("/editUser", (req,res)=>{
    //     res.render('pages/editRegister',{name: values.loginusername});
    // });
    router.post("/registerUser",authmdlware(["role:Owner"]), registerUser.register);

    router.get("/addqtybtn/:id",authmdlware(["role:Owner"]), regedtdel.regedit);
    router.get("/deletebtn/:id",authmdlware(["role:Owner"]), regedtdel.regdel);

    return router;
};