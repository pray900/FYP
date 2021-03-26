const values = require('../values');
const database = require('../database');

exports.logsrc = (req,res) => {

    const { subbtn, search, searchbox} = req.body;
    console.log(subbtn + " is subbnt "+ search+" is search pointer "+ searchbox+" is searchbox");

    if(subbtn == "searchbtn"){

        if(!search || !searchbox){
            errordisp("search box is empty");
        } 
        database.query('select * from logs where '+search+' like ?',['%'+searchbox+'%'], function (error, result) {
            if (error) {
                console.log(error+" in searchbtn");
                errordisp("error in search");
            }else if(!result[0]){
                errordisp("Logs does not exist");
            }else {
                console.log(result+ " searchbtn logs sort and search");
                res.render('pages/logs',{name: values.loginusername, datas: result,msg:"searched", role: values.role});
            }
        });
    }
    
    else{

        database.query('select * from logs order by '+ search+' ASC', function (error, result) {
            if (error) {
                console.log(error+" in sortbtn");
                errordisp("error in sortqty");
            } else if(!result){
                errordisp("No data to sort");
            }else{
                console.log(result+ " sortbtn logs sort and search");
                res.render('pages/logs',{name: values.loginusername, datas: result,msg:"sorted", role: values.role});
            }
        });

    }

    function errordisp(errmsg){
        database.query('select * from logs', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0]+ " default cust sort and search");
                res.render('pages/logs',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
            }
        });
    }

}