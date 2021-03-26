const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.invedit = (req,res) => {

    shopselector.currentshop(function(response){
        mainquery(response)
    });

    function mainquery(reshopid){
        database.query('select * from inventory where shop_id = ? and inv_id = ?',[reshopid, req.params.id], function (error, result) {
            if (error) {
                console.log(error+" in addqtybtn");
                errordisp("error in addqty");
            } else if(!result[0]){
                errordisp("Inv does not exist to add Inv");
            }else{
                console.log(result+ " addqtybtn inv sort and search");
                res.render('pages/addInvQuantity',{name: values.loginusername, datas: result[0], msg: "", role: values.role});
            }
        });
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from inventory where shop_id = ?',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/inventory',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
                }
            });
        }
        shopselector.currentshop(function(response){
            mainquery1(response)
        });
    }

}


exports.invdel = (req,res) => {

    shopselector.currentshop(function(response){
        mainquery(response)
    });
    
    function mainquery(reshopid){
        database.query('delete from inventory where shop_id = ? and inv_id = ?',[reshopid, req.params.id], function (error, result) {
            console.log(result.affectedRows+" res in deletebtn");
            if (error) {
                console.log(error+" in deletebtn");
                errordisp("error in delete");
            } 
            else if(result.affectedRows == 0){                   
                errordisp("Inv does not exist to delete");
            }else{
                console.log(result+ " deletebtn inv sort and search");
                errordisp("row deleted successfully");
            }
        });
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from inventory where shop_id = ?',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/inventory',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
                }
            });
        }
        shopselector.currentshop(function(response){
            mainquery1(response)
        });
    }

}

exports.invhist = (req,res) => {

    

}