const mysql = require('mysql');

var name ="";
var email ="";
var username ="";
var password ="";
var type ="";
var rand = "";

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

module.exports.db;

module.exports.name;
module.exports.email;
module.exports.username;
module.exports.password;
module.exports.type;
exports.rand;