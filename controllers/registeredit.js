const values = require('../values');
const database = require('../database');

exports.regedit = (req,res) => {

    const { mainid, name, username, email, type} = req.body;

    database.query('update login set Name = ? , Email = ? , username = ? , Role = ? where id = ?', [name, email, username, type, mainid], (error, result) => {
        if (error) {
            console.log(error);
            return res.render('pages/editRegister',{name: values.loginusername, datas: {id: mainid, Name: name, Email: email, Role: type, username: username}, msg:"error"});
        } else {
            return res.render('pages/editRegister',{name: values.loginusername, datas: {id: mainid, Name: name, Email: email, Role: type, username: username}, msg:"login edited successfully"});
        }
    })

}