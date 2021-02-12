const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

exports.addInv = (req,res) => {
    console.log(req.body);

    const { name, Invtype, Supplier, costprice, qty, salesprice} = req.body;

    db.query('insert into Inventory set ? ', {Name: name, Invtype: Invtype, Supplier: Supplier, Costprice: costprice, Quantity: qty, Salesprice: salesprice})
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