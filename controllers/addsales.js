const database = require("../database");
const values = require('../values');
const shopselector = require("./shopselector");

exports.newsales = (req,res) => {
    console.log(req.body);

    const { name, saletype, date, qty, salesprice, custid, profit, invid, subbtn} = req.body;


    if(subbtn == "addbtn"){

        shopselector.currentshop(function(response){
            console.log(response + "  current shop func res");
            mainquery(response)
        });
    
        function mainquery(reshopid){
            database.query('insert into sales set ? ', {name: name, sales_type: saletype, date_sold: date, quantity: qty, sales_price: salesprice,inv_id: invid,profit: profit, shop_id: reshopid, user_id: values.loginuserid, customer_id: custid}
            , (error, result) => {
                if (error) {
                    console.log(error);
                    errordisp("error")
                } else {
                    
                    errordisp("success")
                }
            })
        }
    }else if(subbtn == "newcustbtn"){
        res.render('pages/addCustomer',{name: values.loginusername, msg:""});
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from customer where shop_id = ?',[reshopid], function (error, result1) {
                if (error) {
                    console.log(error);
                    res.render('pages/newSales',{name: values.loginusername, datas1: result1, datas:"", msg:errmsg});
                } else {
                    console.log(result1[0]+ " default sales cust");
    
                    shopselector.currentshop(function(response){
                        mainquery(response)
                    });
             
                    function mainquery(reshopid){
                        database.query('select * from inventory where shop_id = ?',[reshopid], function (error, result) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(result[0]+ " default inv sort and search");
                                res.render('pages/newSales',{name: values.loginusername, datas: result, datas1: result1, msg:errmsg});
                            }
                        });
                    }
    
                }
            });
        }

        shopselector.currentshop(function(response){
            mainquery1(response)
        });

    }


}