const mysql = require('mysql');

'use strict';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"fyp"
});

var datetime = new Date();

exports.addlogs = (res) => {
    console.log(res[0].id + "  consloge log test");
    console.log();

    db.query('insert into Logs set ? ', {User_id: res[0].id, Date: datetime, Ip_address: results["Wi-Fi"][0]})
    , (error, result) => {
        if (error) {
            console.log(error);
        } else {

        }
    }
}