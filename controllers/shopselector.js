const database = require("../database");
const values = require("../values");

// exports.dispshop = (req,res) => {

//     database.query('select * from shop', (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             values.dispshoplist = result;
//             //res.redirect('/home');
//             res.send();
            
//         }
//     })
// }

// function dispshop() {
//     database.query('select * from shop'
//     , (error, result) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(result+ "   run tes")
//             values.dispshoplist = result;
//         }
//     })
// }

// module.exports.dispshop;

exports.submitchoice = async (req,res) => {
    try{

    console.log(req.body);

    const {shop} = req.body;
    values.submittedshop = shop;
    console.log(values.submittedshop+" submitted shop");
    res.redirect('/home');

    } catch (error) {
        console.log(error);
    }
}


module.exports.currentshop = function (callback){
    if(!values.submittedshop){
        return callback(values.defaultshopid);
    }
    else{
        database.query('select shop_id from shop where Name = ? ', [values.submittedshop], async (error, result) => {
            console.log("sellected shop "+ result[0].shop_id);
            return callback(result[0].shop_id);
        })
    }
}