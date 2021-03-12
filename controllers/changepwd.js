const database = require("../database");
const bcrypt = require('bcrypt');
const values = require('../values');


exports.newpwd = (req,res) => {
    console.log(req.body);
    const { CurrentPassword, NewPassword, ConfirmPassword} = req.body;

    console.log( CurrentPassword+" npwd "+ NewPassword+" cpwd "+ ConfirmPassword);

    if ( !CurrentPassword || !ConfirmPassword || !NewPassword) {
        console.log('write password correctly')
            return res.render('pages/changepwd', {
            message: "please provide username and password"
        })
    }
    else if( NewPassword !== ConfirmPassword) {
            console.log("new and confirm pwd mismatch");
            return res.render('pages/changepwd', {
                message: "password mismatch"
            });
    }
    database.query('select * from login where username = ?', [values.loginusername], async (error, results) => {
        console.log(results)
        if ( !results[0] || !(await bcrypt.compare(CurrentPassword, results[0].password)) ){
            console.log(results+"  current password");
            res.render('pages/changepwd', {
                message: 'current password wrong'
            })        
        }else{
            let hashedpwd = await bcrypt.hash(ConfirmPassword, 8);
            console.log(hashedpwd+ " new hashed password");
            database.query('update login set password = ? where username = ?', [hashedpwd,values.loginusername], async (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('password changed');
                    database.query('select * from shop', function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            values.defaultshopid = result[0].Shop_id;
                            values.defaultshopname = result[0].Name;
                            console.log(values.defaultshopname + " "+ values.defaultshopid+ " default shop name and id");
                            res.render('pages/home', {name: values.loginusername, shoplist1: result, defshop: result[0].Name, selectedshop: values.submittedshop});
                        }
                    });
                }
            })
        }
    })
}