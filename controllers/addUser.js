const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const values = require("../values");

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

exports.register = (req,res) =>{
    console.log(req.body);
    const { name, email, username, password, repassword, type} = req.body;
    values.name = name;
    values.email = email;
    values.username = username;
    values.password = password;
    values.type = type;
    values.rand = rand;

    //emailvalid(email);

    return res.render('pages/codevalidate');

}

exports.register1 = (req,res) => {
    console.log(req.body);

    const { name, email, username, password, repassword, type} = req.body;

    //emailvalid(email);

    db.query('select email, username from login where email = ? or username = ?', [email, username], async (error, result) => {
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

        db.query('insert into login set ? ', {name: name, email: email, password: hashedpwd, username: username, role: type})
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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fypshrestha@gmail.com',
      pass: 'fypshrestha@12'
    }
  });

var rand = getRndInteger(11111, 99999);

function emailvalid(email){
    var mailOptions = {
        from: 'fypshrestha@gmail.com',
        to: email,
        subject: 'Sending Email for code',
        text: 'the code is '+ rand
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function checker(){

}