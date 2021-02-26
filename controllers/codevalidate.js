const bcrypt = require('bcrypt');
const database = require("../database");
const values = require('../values');

exports.validate = (req,res) =>{
    console.log(req.body);
    console.log(values.name +" values name");
    console.log(values.rand +" values rand");
    const code = req.body.code;
    if(code == values.rand){

        console.log("code match");
        var name = values.name;
        var email = values.email;
        var password = values.password;
        var repassword = values.repassword;
        var type = values.type;
        var username = values.username;


        database.query('select email, username from login where email = ? or username = ?', [email, username], async (error, result) => {
            if(error){
                console.log("error is"+error);
            }
            if(result.length > 0){
                console.log('email or username already used');
                return res.render('pages/addUser', {
                    message: "email already used"
                });
            } else if( password !== repassword) {
                console.log("pwd mismatch");
                return res.render('pages/addUser', {
                    message: "password incorrect"
                });
            }
            let hashedpwd = await bcrypt.hash(password, 8);
            console.log(hashedpwd);
    
            database.query('insert into login set ? ', {name: name, email: email, password: hashedpwd, username: username, role: type})
        }, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('pages/loginpage', {
                    message: "success"
                });
            }
        });
    }
    else {
        console.log("code does not match");
        res.render('pages/codevalidate');
    }
}