const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const role = require('./role');
const addlog = require('./addlogs')
const values = require('../values');

const express = require('express');
const app = express();

const database = require("../database");

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
 }))

exports.login = async (req,res) => {
    try{

        const { username, password } = req.body;
        console.log(username+ "  pass "+password);
        if ( !username || !password) {
            console.log('empty username or password')
                return res.render('pages/login', {
                message: "Please provide username and password"
            })
        }

        database.query('select * from login where username = ? and state = "s"', [username], async (error,results) => {
            console.log(results)
            var results1 = results;
            if ( !results[0] || !(await bcrypt.compare(password, results[0].password)) ){
                console.log(results+"error username and password");
                res.render('pages/login', {
                    message: 'Wrong username or password'
                })
            } else {
                var userid = results[0].id;
                values.loginusername = results[0].username;
                values.loginuserid = results[0].id;
                values.role = results[0].Role;
                console.log("role role is ",values.role);
                console.log("active user is "+ values.loginusername + values.loginuserid);
                //username1 = results[0].username;
                database.query('select * from logs where User_id = ?', [userid], async (error,results) => {
                    console.log("hello  " + results)
                    if( !results[0] ){
                        addlog.addlogs(results1);
                        res.status(200).redirect("/changepwd");
                    }
                    else{
                        addlog.addlogs(results1);
                        // role.role = results[0].Role;
                        //res.status(200).redirect("/home");
                        res.status(200).redirect("/token");
                        //res.status(200).render('pages/home',{message: username1});
                    }
                })

            }
        })

        // database.query('select * from login where username = ?', [username], async (error,results) => {
        //     console.log(results)
        //     if ( !results || !(await bcrypt.compare(password, results[0].password)) ){
        //         console.log(results+"error username and password");
        //         res.render('pages/login', {
        //             message: 'username or password wrong'
        //         })
        //     } else {
        //         //const id = results[0].id;
        //         //const token = jwt.sign({id}, process.env.JWT_SECRET, {
        //         //    expiresIn: process.env.JWT_EXPIRE_IN
        //         //});
        //         //console.log("token is "+token);
        //         //const cookieOption = {
        //         //    expires: new Date(
        //         //        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000
        //         //    ),
        //         //    httpOnly: true
        //         //}
        //         //res.cookie('jwt', token, cookieOption);
        //         addlog.addlogs(results);
        //         role.role = results[0].Role;
        //         res.status(200).redirect("/home");
        //     }

        // })

    } catch (error) {
        console.log("no username");
        console.log(error);
    }
}
