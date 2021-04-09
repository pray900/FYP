const database = require("../database");
const values = require("../values");
const shopselector = require("./shopselector");
//const qrcodefl = require("../qrcode.min.js");
var QRCode = require('qrcode');


// function currentshop(callback){
//     if(!values.submittedshop){
//         return values.defaultshopid;
//     }
//     else{
//         database.query('select shop_id from shop where Name = ? ', [values.submittedshop], async (error, result) => {
//             console.log("sellected shop "+ result[0].shop_id);
//             return callback(result[0].shop_id);
//         })
//     }
// }

exports.addInv = (req,res) => {
    console.log(req.body);

    const { name, invtype, supplier, costprice, quantity, salesprice} = req.body;

    var url;
    //var objs = [ name," ", invtype," ", supplier," ", costprice," ", quantity," ", salesprice];
    //var objs = [ invid," ",name," ", salesprice];

    // let try = new promise((succ,fail) => {      
    //     QRCode.toDataURL(objs, { version: 3 }, function (err, obz) {
    //         if(err){
    //             console.log(err);
    //             res.send("error");
    //         }
    //         url = obz;
    //         console.log(obz);
    //     })
    // })

    function dishqr(invidp){      
        var objs = [invidp," ",name," ", salesprice];
        QRCode.toDataURL(objs, { errorCorrectionLevel:'H' }, function (err, obz) {
            if(err){
                console.log(err);
                res.send("errorsss");
            }
            url = obz;
            console.log(objs[0],"invidp");
            console.log(obz);
        })
    }

    // var qrcode = new qrcodefl.QRCode("output",{
    //     text:"hello",
    //     width:256,
    //     height:256,
    //     colorDark: "#990000",
    //     colorLight:"#ffffff",
    //     correctLevel:QRCode.CorrectLevel.H
    // });
    // qrcode.clear();
    // qrcode.makeCode("hello2");



    if ( !name || !invtype || !supplier || !costprice || !quantity || !salesprice || Number.isInteger(parseInt(costprice)) == false || Number.isInteger(parseInt(salesprice)) == false || Number.isInteger(parseInt(quantity)) == false) {
        return res.render('pages/addInv', {
            msg: "Enter Valid Informations", pic: url, name: values.loginusername, vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
        });
    }

    shopselector.currentshop(function(response){
        console.log(response + "  current shop func res");
        mainquery(response);
        //dishqr();
    });
    
    // if(!values.submittedshop){
    //     mainquery(values.defaultshopid)
    // }
    // else{
    //     database.query('select shop_id from shop where Name = ? ', [values.submittedshop], async (error, result) => {
    //         console.log("sellected shop "+ result[0].shop_id);
    //         mainquery(result[0].shop_id);
    //     })
    // }

    // database.query('insert into Inventory set ? ', {name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, Quantity: quantity, sales_price: salesprice, shop_id: }
    // , (error, result) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         return res.render('pages/addInv', {
    //             message: "success"
    //         });
    //     }
    // })

    function mainquery(reshopid){
        database.query('insert into Inventory set ? ', {name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, Quantity: quantity, sales_price: salesprice, shop_id: reshopid, state: "s"}
        , (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addInv', {
                    msg: "error", pic: url, name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
                });
            } else {
                invidfetch();
                // return res.render('pages/addInv', {
                //     msg: "success", name: values.loginusername
                // });
            }
        })
    }

    var today = new Date();
    //var invid = "";
    function invidfetch(){
        database.query('select inv_id from inventory where name = ? and inv_type = ? and supplier = ? and cost_price = ? and state = "s"', [name, invtype, supplier, costprice]
        , (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addInv', {
                    msg: "error in invidfetch", pic: url, name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
                });
            } else {
                //invid = result[0].inv_id;
                console.log(result[0].inv_id, "inv id");
                dishqr(String(result[0].inv_id));
                console.log(url,"url console")
                // dbforqr(result[0].inv_id,name,quantity);
                hist(result[0].inv_id,name,quantity);
            }
        })
    }

    function dbforqr(id){
        database.query('update inventory set qrcode = ? where inv_id = ? and state = "s"',[url, id], (error, result1) => {
            if(error) {
                return res.render('pages/addInv', {
                    msg: "error in inserting url to db", pic: url, name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
                });
            } else {
                console.log("dbqr success"); 
                return res.render('pages/addInv', {
                    msg: "Success", pic: url, name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
                });   
            }
        })
    }

    function hist(invid, nm, qty_add){
        database.query('insert into history set ? ', {name: nm, inv_id: invid, date: today, user_id: values.loginuserid, current_qty: 0, qty_added: qty_add, status: 'new inv'}
        , (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addInv', {
                    msg: "error", pic: url, name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
                });
            } else {
                console.log(url,"hist url");
                dbforqr(invid);

                // return res.render('pages/addInv', {
                //     msg: "Success", pic: url, name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}, role: values.role
                // });
            }
        })
    }

}
