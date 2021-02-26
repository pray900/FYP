const database = require("../database");

exports.addInv = (req,res) => {
    console.log(req.body);

    const { name, Invtype, Supplier, costprice, qty, salesprice} = req.body;

    database.query('insert into Inventory set ? ', {Name: name, Invtype: Invtype, Supplier: Supplier, Costprice: costprice, Quantity: qty, Salesprice: salesprice})
    , (error, result) => {
        if (error) {
            console.log(error);
        } else {
            return res.render('pages/addInv', {
                message: "success"
            });
        }
    }
}