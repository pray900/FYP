const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.regedit = (req,res) => {

    database.query('select * from login where id = ? and state = "s"',[req.params.id], function (error, result) {
        if (error) {
            console.log(error+" in editbtn");
            errordisp("error in editbtn");
        } else if(!result[0]){
            errordisp("login does not exist");
        }else{
            console.log(result+ " edit register sort and search");
            res.render('pages/editRegister',{name: values.loginusername, datas: result[0], msg: ""});
        }
    });

    function errordisp(errmsg){

        database.query('select * from login where state = "s"', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0]+ " default login sort and search");
                res.render('pages/register',{name: values.loginusername, datas: result, msg:errmsg});
            }
        });
    }

}

exports.regdel = (req,res) => {
    
    database.query('update login set state = "d" where id = ?',[req.params.id], function (error, result) {
        console.log(result.affectedRows+" res in deletebtn");
        if (error) {
            console.log(error+" in deletebtn");
            errordisp("error in delete");
        } else if(result.affectedRows == 0){                   
            errordisp("login does not exist to delete");
        }else{
            console.log(result+ " deletebtn register sort and search");
            errordisp("row deleted successfully");
        }
    });

    function errordisp(errmsg){

        database.query('select * from login where state = "s"', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0]+ " default login sort and search");
                res.render('pages/register',{name: values.loginusername, datas: result, msg:errmsg});
            }
        });
    }

}