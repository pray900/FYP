const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.invedit = (req,res) => {

    const { mainid, name, invtype, supplier, costprice, quantity, salesprice} = req.body;
    console.log("it runs"+ mainid);

    database.query('update inventory set name = ? , inv_type = ? , quantity = ? , cost_price = ? , supplier = ? , sales_price = ? where inv_id = ?',[name, invtype, quantity, costprice, supplier, salesprice, mainid], function (error, result) {
        if (error) {
            console.log(error+" in addqtybtn");
            rres.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Error"});
        }else{
            console.log(result+ " Inventory Edited successfully");
            res.render('pages/addInvQuantity',{name: values.loginusername, datas: { inv_id: mainid, name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, quantity: quantity, sales_price: salesprice}, msg: "Inventory Edited successfully"});
        }
    });

}