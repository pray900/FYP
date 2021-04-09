const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.custedit = (req,res) => {

    shopselector.currentshop(function(response){
        mainquery(response)
    });

    function mainquery(reshopid){
        database.query('select * from customer where shop_id = ? and customer_id = ? and state = "s"',[reshopid, req.params.id], function (error, result) {
            if (error) {
                console.log(error+" in editbtn");
                errordisp("error in editbtn");
            } else if(!result[0]){
                errordisp("customer does not exist");
            }else{
                console.log(result+ " edit customer sort and search");
                res.render('pages/editCustomer',{name: values.loginusername, datas: result[0], msg: "", role: values.role});
            }
        });
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from customer where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/customer',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
                }
            });
        }
        shopselector.currentshop(function(response){
            mainquery1(response)
        });
    }

}

exports.custdel = (req,res) => {
    
    shopselector.currentshop(function(response){
        mainquery(response)
    });

    function mainquery(reshopid){
        database.query('update customer set state = "d" where shop_id = ? and customer_id = ?',[reshopid, req.params.id], function (error, result) {
            console.log(result.affectedRows+" res in deletebtn");
            if (error) {
                console.log(error+" in deletebtn");
                errordisp("Error in delete");
            } else if(result.affectedRows == 0){                   
                errordisp("Customer does not exist to delete");
            }else{
                console.log(result+ " deletebtn customer sort and search");
                errordisp("Row deleted successfully");
            }
        });
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from customer where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default inv sort and search");
                    res.render('pages/customer',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
                }
            });
        }
        shopselector.currentshop(function(response){
            mainquery1(response)
        });
    }

}