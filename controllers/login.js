const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const role = require('./role');
const addlog = require('./addlogs')

const express = require('express');
const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
 }))

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

exports.login = async (req,res) => {
    try{

        const { username, password } = req.body;
        console.log(username+ "  pass "+password);
        if ( !username || !password) {
                return res.render('pages/loginpage', {
                message: "please provide username and password"
            })
        }
        db.query('select * from login where username = ?', [username], async (error,results) => {
            console.log(results)
            if ( !results || !(await bcrypt.compare(password, results[0].password)) ){
                console.log(results+"error username and password");
                res.render('pages/loginpage', {
                    message: 'username or password wrong'
                })
            } else {
                //const id = results[0].id;
                //const token = jwt.sign({id}, process.env.JWT_SECRET, {
                //    expiresIn: process.env.JWT_EXPIRE_IN
                //});
                //console.log("token is "+token);
                //const cookieOption = {
                //    expires: new Date(
                //        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000
                //    ),
                //    httpOnly: true
                //}
                //res.cookie('jwt', token, cookieOption);
                addlog.addlogs(results);
                role.role = results[0].Role;
                res.status(200).redirect("/home");
            }

        })

    } catch (error) {
        console.log("no username");
        console.log(error);
    }
}
