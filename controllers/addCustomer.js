const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

exports.addCustomer = (req,res) => {
    console.log(req.body);

    const { name, email, number, address} = req.body;

    db.query('insert into Inventory set ? ', {Name: name, Email: email, Number: number, Address: address})
    , (error, result) => {
        if (error) {
            console.log(error);
        } else {
            return res.render('pages/addCustomer', {
                message: "success"
            });
        }
    }
}