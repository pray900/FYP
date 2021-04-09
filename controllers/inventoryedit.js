const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');
var QRCode = require('qrcode');

exports.invedit = (req,res) => {

    const { mainid, name, invtype, supplier, costprice, totalqty, quantity, salesprice, qrcode} = req.body;
    console.log("it runs"+ mainid);

    if ( !name || !invtype ||  !supplier || !costprice || !quantity  || !totalqty || !salesprice || Number.isInteger(parseInt(costprice)) == false || Number.isInteger(parseInt(salesprice)) == false || Number.isInteger(parseInt(quantity)) == false || Number.isInteger(parseInt(totalqty)) == false) {
        return res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice, qrcode: qrcode}, msg: "Enter Valid Information", role: values.role})
    }
    var defaultqrcode = "";
    database.query('select name, sales_price, qrcode from inventory where inv_id = ?',[mainid], function (error,result) {
        if(error){
            console.log(error);
        } else {
            console.log("fetch current invs");
            console.log(result);
            defaultqrcode = result[0].qrcode;
            if(name != result[0].name || salesprice != result[0].sales_price){
                console.log("name or sp is diff");
                var objs = [mainid," ",name," ", salesprice];
                QRCode.toDataURL(objs, { errorCorrectionLevel:'H' }, function (err, obz) {
                if(err){
                    console.log(err);
                    res.send("errorsss");
                }
                console.log(objs[0],objs[2],objs[4],"mainid");
                console.log(obz);

                    database.query('update inventory set name = ? , inv_type = ? , quantity = ? , cost_price = ? , supplier = ? , sales_price = ?, qrcode = ? where inv_id = ? and state = "s"',[name, invtype, totalqty, costprice, supplier, salesprice, obz, mainid], function (error, result) {
                        if (error) {
                            console.log(error+" in addqtybtn");
                            res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Error", role: values.role});
                        }else{
                            console.log(result+ "Qr changed Inventory Edited successfully");
                            var qtyadded = parseInt(totalqty) - parseInt(quantity);
                            database.query('insert into history set ? ',{name: name,inv_id:mainid ,date:fulldate ,user_id:values.loginuserid ,current_qty: quantity ,qty_added: qtyadded ,status:"Inv Edited" }, function (error, result) {
                                if (error) {                       
                                    console.log(error);
                                    errordisp("Error in updating history");
                                }else{                                           
                                    res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: totalqty, sales_price: salesprice, qrcode: obz}, msg: "Inventory Edited successfully", role: values.role});
                                }
                            });            
                        }
                    });
                })
            }else{
                defupdate();
            }
        }
    });
    


    var d = new Date();
    var fulldate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();

    function defupdate(){                                                  
        database.query('update inventory set name = ? , inv_type = ? , quantity = ? , cost_price = ? , supplier = ? , sales_price = ? where inv_id = ? and state = "s"',[name, invtype, totalqty, costprice, supplier, salesprice, mainid], function (error, result) {
            if (error) {
                console.log(error+" in addqtybtn");
                res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Error", role: values.role});
            }else{
                console.log(result+ " Qr not changed Inventory Edited successfully");
                var qtyadded = parseInt(totalqty) - parseInt(quantity);
                database.query('insert into history set ? ',{name: name,inv_id:mainid ,date:fulldate ,user_id:values.loginuserid ,current_qty: quantity ,qty_added: qtyadded ,status:"Inv Edited" }, function (error, result) {
                    if (error) {                       
                        console.log(error);
                        errordisp("Error in updating history");
                    }else{                                           
                        res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: totalqty, sales_price: salesprice, qrcode: defaultqrcode}, msg: "Inventory Edited successfully", role: values.role});
                    }
                });            
            }
        });
    }

        function errordisp(errmsg){

            function mainquery1(reshopid){
                database.query('select * from inventory where shop_id = ? and state = "s"',[reshopid], function (error, result) {
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

    // database.query('update inventory set name = ? , inv_type = ? , quantity = ? , cost_price = ? , supplier = ? , sales_price = ? where inv_id = ? and state = "s"',[name, invtype, quantity, costprice, supplier, salesprice, mainid], function (error, result) {
    //     if (error) {
    //         console.log(error+" in addqtybtn");
    //         res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Error", role: values.role});
    //     }else{
    //         console.log(result+ " Inventory Edited successfully");
    //         // database.query('insert into history set ? ',{name: name,inv_id:mainid ,date:fulldate ,user_id:values.loginuserid ,current_qty: ,qty_added: "-"+qty ,status:"sales" }, function (error, result) {
    //         //     if (error) {
    //         //         errordisp("error in updating history");
    //         //     }else{                                           
    //         //         res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Inventory Edited successfully", role: values.role});
    //         //     }
    //         // });            
    //     }
    // });

}