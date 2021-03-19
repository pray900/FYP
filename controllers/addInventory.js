const database = require("../database");
const values = require("../values");
const shopselector = require("./shopselector");

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

    if ( !name || !supplier || !costprice || !quantity || !salesprice || Number.isInteger(parseInt(costprice)) == false || Number.isInteger(parseInt(salesprice)) == false || Number.isInteger(parseInt(quantity)) == false) {
        return res.render('pages/addInv', {
            msg: "Enter Valid Informations", name: values.loginusername, vals: {name, invtype, supplier, costprice, quantity, salesprice}
        });
    }

    shopselector.currentshop(function(response){
        console.log(response + "  current shop func res");
        mainquery(response)
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
        database.query('insert into Inventory set ? ', {name: name, inv_type: invtype, supplier: supplier, cost_price: costprice, Quantity: quantity, sales_price: salesprice, shop_id: reshopid}
        , (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addInv', {
                    msg: "error", name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}
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

    function invidfetch(){
        database.query('select inv_id from inventory where name = ? and inv_type = ? and supplier = ? and cost_price = ?', [name, invtype, supplier, costprice]
        , (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addInv', {
                    msg: "error in invidfetch", name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}
                });
            } else {
                console.log(result[0].inv_id, "inv id");
                hist(result[0].inv_id,name,quantity);
            }
        })
    }

    function hist(invid, nm, qty_add){
        database.query('insert into history set ? ', {name: nm, inv_id: invid, date: today, user_id: values.loginuserid, current_qty: 0, qty_added: qty_add, status: 'new inv'}
        , (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addInv', {
                    msg: "error", name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}
                });
            } else {
                return res.render('pages/addInv', {
                    msg: "Success", name: values.loginusername,vals: {name, invtype, supplier, costprice, quantity, salesprice}
                });
            }
        })
    }

}
