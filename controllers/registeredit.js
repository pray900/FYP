const values = require('../values');
const database = require('../database');

exports.regedit = (req,res) => {

    const { mainid, name, username, email, type} = req.body;
    if ( !name || !username ||  !email || !type ) {
        return res.render('pages/editRegister',{name: values.loginusername, datas: {id: mainid, Name: name, Email: email, Role: type, username: username}, msg:"Enter All Details"});
    }

    database.query('update login set Name = ? , Email = ? , username = ? , Role = ? where id = ? and state = "s"', [name, email, username, type, mainid], (error, result) => {
        if (error) {
            console.log(error);
            return res.render('pages/editRegister',{name: values.loginusername, datas: {id: mainid, Name: name, Email: email, Role: type, username: username}, msg:"Error"});
        } else {
            return res.render('pages/editRegister',{name: values.loginusername, datas: {id: mainid, Name: name, Email: email, Role: type, username: username}, msg:"Login edited successfully"});
        }
    })

}