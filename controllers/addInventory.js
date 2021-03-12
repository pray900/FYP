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
                    msg: "error", name: values.loginusername
                });
            } else {
                return res.render('pages/addInv', {
                    msg: "success", name: values.loginusername
                });
            }
        })
    }

}
