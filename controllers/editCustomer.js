const database = require("../database");
const values = require("../values");
const shopselector = require("./shopselector");

exports.editCustomer = (req,res) => {

    console.log(req.body);

    const { mainid, name, email, number, address} = req.body;

    if(!name || !email || !number || !address){
        return res.render('pages/editCustomer',{name: values.loginusername, datas: { customer_id: mainid, name: name, email: email, address: address, number: number}, msg:"Enter All Details", role: values.role});
    }

    shopselector.currentshop(function(response){
        console.log(response + "  current shop func res");
        mainquery(response)
    });

    function mainquery(reshopid){

        database.query('update customer set name = ? , email = ? , number = ? , address = ? where customer_id = ? and state = "s"', [name, email, number, address, mainid], (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/editCustomer',{name: values.loginusername, datas: { customer_id: mainid, name: name, email: email, address: address, number: number}, msg:"error", role: values.role});
            } else {
                return res.render('pages/editCustomer',{name: values.loginusername, datas: { customer_id: mainid, name: name, email: email, address: address, number: number}, msg:"Customer successfully edited", role: values.role});
            }
        })

    } 

}