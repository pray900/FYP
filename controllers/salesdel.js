const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.salesdel = (req,res) => {

    shopselector.currentshop(function(response){
        mainquery(response)
    });

    function mainquery(reshopid){
        database.query('delete from sales where shop_id = ? and sales_id = ?',[reshopid, req.params.id], function (error, result) {
            console.log(result.affectedRows+" res in deletebtn");
            if (error) {
                console.log(error+" in deletebtn");
                errordisp("error in delete");
            } else if(result.affectedRows == 0){                   
                errordisp("sale does not exist to delete");
            }else{
                console.log(result+ " deletebtn sale sort and search");
                errordisp("row deleted successfully");
            }
        });
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from sales where shop_id = ?',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default sales sort and search");
                    res.render('pages/sales',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
                }
            });
        }
        shopselector.currentshop(function(response){
            mainquery1(response)
        });
    }

}