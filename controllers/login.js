const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

exports.login = async (req,res) => {
    try{

        const { username, password } = req.body;
        if ( !username || !password) {
            return res.status(400).render('pages/loginpage', {
                message: "please provide username and password"
            })
        }
        db.query('select * from login where username = ?', [username], async (error,results) => {
            console.log(results+"resss")
            if ( !results || !(await bcrypt.compare(password, results[0].password)) ){
                console.log(results+"error username and password");
                res.status(401).render('pages/loginpage', {
                    message: 'username or password wrong'
                });
            } else {
                const id = results[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN
                });
                console.log("token is "+token);
                const cookieOption = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOption);
                res.status(200).redirect("/")
            }

        })

    } catch (error) {
        console.log("no username");
        console.log(error);
    }
}


exports.register = (req,res) => {
    console.log(req.body);

    const { name, email, username, password, repassword, type} = req.body;

    db.query('select email from login where email = ?', [email], async (error, result) => {
        if(error){
            console.log("error is"+error);
        }
        if(result.length > 0 ){
            console.log('email already used');
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