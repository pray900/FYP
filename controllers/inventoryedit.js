const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.invedit = (req,res) => {

    const { mainid, name, invtype, supplier, costprice, totalqty, quantity, salesprice} = req.body;
    console.log("it runs"+ mainid);

    if ( !name || !invtype ||  !supplier || !costprice || !quantity  || !totalqty || !salesprice || Number.isInteger(parseInt(costprice)) == false || Number.isInteger(parseInt(salesprice)) == false || Number.isInteger(parseInt(quantity)) == false || Number.isInteger(parseInt(totalqty)) == false) {
        return res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Enter Valid Information", role: values.role})
    }

    var d = new Date();
    var fulldate = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();                                                  
        database.query('update inventory set name = ? , inv_type = ? , quantity = ? , cost_price = ? , supplier = ? , sales_price = ? where inv_id = ? and state = "s"',[name, invtype, totalqty, costprice, supplier, salesprice, mainid], function (error, result) {
            if (error) {
                console.log(error+" in addqtybtn");
                res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Error", role: values.role});
            }else{
                console.log(result+ " Inventory Edited successfully");
                var qtyadded = parseInt(totalqty) - parseInt(quantity);
                database.query('insert into history set ? ',{name: name,inv_id:mainid ,date:fulldate ,user_id:values.loginuserid ,current_qty: quantity ,qty_added: qtyadded ,status:"Inv Edited" }, function (error, result) {
                    if (error) {
                        errordisp("error in updating history");
                    }else{                                           
                        res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Inventory Edited successfully", role: values.role});
                    }
                });            
            }
        });

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