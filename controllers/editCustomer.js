const database = require("../database");
const values = require("../values");
const shopselector = require("./shopselector");

exports.editCustomer = (req,res) => {

    console.log(req.body);

    const { mainid, name, email, number, address} = req.body;

    shopselector.currentshop(function(response){
        console.log(response + "  current shop func res");
        mainquery(response)
    });

    function mainquery(reshopid){

        database.query('update customer set name = ? , email = ? , number = ? , address = ? where customer_id = ?', [name, email, number, address, mainid], (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/editCustomer',{name: values.loginusername, datas: { customer_id: mainid, name: name, email: email, address: address, number: number}, msg:"error"});
            } else {
                return res.render('pages/editCustomer',{name: values.loginusername, datas: { customer_id: mainid, name: name, email: email, address: address, number: number}, msg:"customer successfully edited"});
            }
        })

    } 

}