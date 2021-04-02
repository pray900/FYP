const database = require("../database");
const values = require('../values');
const shopselector = require("./shopselector");

exports.newsales = (req,res) => {
    console.log(req.body);

    const { name, saletype, date, qty, salesprice, custid, totalprice, invid, subbtn} = req.body;

    var d = new Date();
    var fulldate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();

    if(subbtn == "addbtn"){

        if ( !name || !saletype || !date || !qty || !custid || !salesprice || !totalprice || !invid || Number.isInteger(parseInt(salesprice)) == false || Number.isInteger(parseInt(totalprice)) == false || Number.isInteger(parseInt(qty)) == false || Number.isInteger(parseInt(invid)) == false || Number.isInteger(parseInt(custid)) == false) {
            function mainquery2(reshopid){
                database.query('select * from customer where shop_id = ? and state = "s"',[reshopid], function (error, result1) {
                    if (error) {
                        console.log(error);
                        res.render('pages/newSales',{name: values.loginusername,vals: {name, saletype, date: fulldate, qty, salesprice, custid, totalprice, invid}, datas1: result1, datas:"", msg:"enter all details", role: values.role});
                    } else {
                        console.log(result1[0]+ " default sales cust");
                    
                        shopselector.currentshop(function(response){
                            mainquery(response)
                        });
                    
                        function mainquery(reshopid){
                            database.query('select * from inventory where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(result[0]+ " default inv sort and search");
                                    res.render('pages/newSales',{name: values.loginusername,vals: {name, saletype, date: fulldate, qty, salesprice, custid, totalprice, invid}, datas: result, datas1: result1, msg:"enter all details", role: values.role});
                                }
                            });
                        }
                    
                    }
                });
            }
            shopselector.currentshop(function(response){
                mainquery2(response)
            });
        }

        shopselector.currentshop(function(response){
            console.log(response + "  current shop func res");
            mainquery(response)
        });
    
        function mainquery(reshopid){
            database.query('select cost_price from inventory where shop_id = ? and state = "s" and inv_id = ?',[reshopid, invid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0].cost_price+ " cost price of addsales");
                    var profit = totalprice - (qty*result[0].cost_price);
                    database.query('insert into sales set ? ', {name: name, sales_type: saletype, date_sold: date, quantity: qty, sales_price: totalprice,inv_id: invid,profit: profit, shop_id: reshopid, user_id: values.loginuserid, customer_id: custid, state: "s"}
                        , (error, result) => {
                        if (error) {
                            console.log(error);
                            errordisp("error");
                        } else {
                            database.query('select quantity from inventory where inv_id = ? and state = "s"',[invid], function (error, result1) {
                                if (error) {
                                    errordisp("error in fetching qty");
                                }else{
                                    var newqty = result1[0].quantity - qty;
                                    database.query('update inventory set quantity = ? where inv_id = ? and state = "s"',[newqty, invid], function (error, result) {
                                        if (error) {
                                            errordisp("error in updating qty");
                                        }else{
                                            database.query('insert into history set ? ',{name: name,inv_id:invid ,date:date ,user_id:values.loginuserid ,current_qty:result1[0].quantity ,qty_added: "-"+qty ,status:"sales" }, function (error, result) {
                                                if (error) {
                                                    errordisp("error in updating history");
                                                }else{                                           
                                                    errordisp("success");
                                                }
                                            });
                                        }
                                    }); 
                                }
                            });         
                        }
                    })
                }
            });
            
            // database.query('insert into sales set ? ', {name: name, sales_type: saletype, date_sold: date, quantity: qty, sales_price: salesprice,inv_id: invid,profit: profit, shop_id: reshopid, user_id: values.loginuserid, customer_id: custid, state: "s"}
            // , (error, result) => {
            //     if (error) {
            //         console.log(error);
            //         errordisp("error")
            //     } else {                   
            //         errordisp("success")
            //     }
            // })
        }
    }else if(subbtn == "newcustbtn"){
        //res.render('pages/addCustomer',{name: values.loginusername, msg:"", role: values.role});
        res.redirect("/customer/addCust");
    }else if(subbtn == "qrcode"){
        //res.render('pages/addCustomer',{name: values.loginusername, msg:"", role: values.role});
        res.redirect("/qrcode");
    }

    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from customer where shop_id = ? and state = "s"',[reshopid], function (error, result1) {
                if (error) {
                    console.log(error);
                    res.render('pages/newSales',{name: values.loginusername,vals: {name: "", saletype: "", date: fulldate, qty: "", salesprice: "", custid: "", totalprice:"", invid: ""}, datas1: result1, datas:"", msg:errmsg, role: values.role});
                } else {
                    console.log(result1[0]+ " default sales cust");
    
                    shopselector.currentshop(function(response){
                        mainquery(response)
                    });
             
                    function mainquery(reshopid){
                        database.query('select * from inventory where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(result[0]+ " default inv sort and search");
                                res.render('pages/newSales',{name: values.loginusername,vals: {name: "", saletype: "", date: fulldate, qty: "", salesprice: "", custid: "", totalprice:"", invid: ""}, datas: result, datas1: result1, msg:errmsg, role: values.role});
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