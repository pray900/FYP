const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/addUser');
const RegisterSearch = require('../controllers/registersearch');
const RegisterEdit = require('../controllers/registeredit');
const regedtdel = require('../controllers/registeredtdel');
const values = require('../values');
const database = require('../database');

module.exports = () => {
    router.get("/", (req,res)=>{

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
    router.get("/addUser", (req,res)=>{
        res.render('pages/addRegister',{name: values.loginusername, msg: "", vals:{name:"", email:"", username:"", type:""}});
    });

    router.post("/search", RegisterSearch.regsrc);

    router.post("/edit", RegisterEdit.regedit);

    // router.get("/editUser", (req,res)=>{
    //     res.render('pages/editRegister',{name: values.loginusername});
    // });
    router.post("/registerUser", registerUser.register);

    router.get("/addqtybtn/:id", regedtdel.regedit);
    router.get("/deletebtn/:id", regedtdel.regdel);

    return router;
};