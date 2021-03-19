const database = require("../database");
const values = require("../values");
const shopselector = require("./shopselector");

exports.addCustomer = (req,res) => {
    console.log(req.body);

    const { name, email, number, address} = req.body;

    if(!name || !email || !number || !address){
        return res.render('pages/addCustomer',{name: values.loginusername, msg:"Enter All Details"});
    }

    shopselector.currentshop(function(response){
        console.log(response + "  current shop func res");
        mainquery(response)
    });

    function mainquery(reshopid){

        database.query('insert into Customer set ? ', {Name: name, Email: email, Number: number, Address: address, shop_id: reshopid, user_id: values.loginuserid}, (error, result) => {
            if (error) {
                console.log(error);
                return res.render('pages/addCustomer',{name: values.loginusername, msg:"error"});
            } else {
                return res.render('pages/addCustomer',{name: values.loginusername, msg:"Customer Successfully Added"});
            }
        })

    }   
}