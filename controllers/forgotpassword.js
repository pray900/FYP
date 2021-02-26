const database = require("../database");
const bcrypt = require('bcrypt');
const values = require('../values');
const nodemailer = require('nodemailer');

exports.forgotpassword = (req,res) => {

    console.log(req.body);
    const {username} = req.body;
    values.loginusername = username;

    database.query('select * from login where username = ?', [username], async (error, results) => {
        console.log("username's email is "+ results[0].Email);
        if(error){
            console.log("error is"+error);
        }
        if( !results[0]){
            console.log('username does not exist');
            return res.render('pages/forgotpassword', {
                message: "incorrect username"
            });
        }
        else{
            emailvalid(results[0].Email);

            let hashedpwd = await bcrypt.hash(rand, 8);
            console.log(rand+"  reset rand value");
            console.log(hashedpwd);

            database.query('update login set password = ? where username = ?', [hashedpwd,username], async (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('password changed');
                    return res.render('pages/changepwd', {
                        message: "success"
                    });
                }
            })            
        }       
    });


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fypshrestha@gmail.com',
          pass: 'fypshrestha@12'
        }
      });

    var rand = "";

    function emailvalid(email){
        rand = getRand(8);
        console.log(rand + " code is");
        var mailOptions = {
            from: 'fypshrestha@gmail.com',
            to: email,
            subject: 'Sending Email for code',
            text: 'Your password is '+ rand
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
}