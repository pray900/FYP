const express = require('express');
const router = express.Router();
const values = require('../values');
const LogsSearch = require('../controllers/logsearch');
const database = require('../database');

module.exports = () => {
    router.get("/", (req,res)=>{

        database.query('select * from logs', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0]+ " default logs sort and search");
                res.render('pages/logs',{name: values.loginusername, datas: result, msg:"", role:values.role});
            }
        });

        //res.render('pages/logs',{name: values.loginusername});
    });

    router.post("/search", LogsSearch.logsrc);

    return router;
};