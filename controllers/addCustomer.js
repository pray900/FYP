const database = require("../database");

exports.addCustomer = (req,res) => {
    console.log(req.body);

    const { name, email, number, address} = req.body;

    database.query('insert into Customer set ? ', {Name: name, Email: email, Number: number, Address: address})
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