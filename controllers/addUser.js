const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const database = require("../database");
const values = require('../values');

// exports.register = (req,res) =>{
//     console.log(req.body);
//     //const { name, email, username, password, repassword, type} = req.body;
//     const { name, email, username, type} = req.body;
//     values.name = name;
//     values.email = email;
//     values.username = username;
//     //values.password = password;
//     //values.repassword = repassword;
//     values.type = type;

//     emailvalid(email);

//     values.rand = rand;
//     values.password = rand;

//     return res.render('pages/codevalidate');

// }

exports.register = (req,res) => {
    console.log(req.body);

    //const { name, email, username, password, repassword, type} = req.body;
    const { name, email, username, type} = req.body;
    usernm = username;
    
    if ( !name || !email || !username || !type) {
        console.log('enter all data')
            return res.render('pages/addRegister', {
            msg: "Provide All Details", name: values.loginusername, vals:{name, email, username, type}
        })
    }
    //emailvalid(email);

    database.query('select email, username from login where state = "s" and (email = ? or username = ?)', [email, username], async (error, result) => {
        if(error){
            console.log("error is"+error);
        }
        if(result.length > 0){
            console.log('email or username already used');
            return res.render('pages/addRegister', {
                msg: "email already used",name: values.loginusername, vals:{name, email, username, type}
            });
        } 
        // else if( password !== repassword) {
        //     console.log("pwd mismatch");
        //     return res.render('pages/addUser', {
        //         message: "password incorrect"
        //     });
        // }
        emailvalid(email);

        let hashedpwd = await bcrypt.hash(rand, 8);
        console.log(rand+"  rand value");
        console.log(hashedpwd);

    //     database.query('insert into login set ? ', {name: name, email: email, password: hashedpwd, username: username, role: type})
    // }, (error, result) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         return res.render('pages/addUser', {
    //             message: "success"
    //         });
    //     }
    database.query('insert into login set ? ', {name: name, email: email, password: hashedpwd, username: username, role: type, state: "s"}, async (error, result) => {
    if (error) {
        console.log(error);
    } else {
        return res.render('pages/addRegister', {
            msg: "success", name: values.loginusername, vals:{name, email, username, type}
        });
    }
    });
});
} 

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fypshrestha@gmail.com',
      pass: 'fypshrestha@12'
    }
  });

var rand = "";
var usernm = "";
function emailvalid(email){
    rand = getRand(8);
    console.log(rand + " code is");
    var mailOptions = {
        from: 'fypshrestha@gmail.com',
        to: email,
        subject: 'Sending Email for code',
        text: 'Your password is '+ rand +' and your username is '+usernm
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

function getRand(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}