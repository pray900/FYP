const values = require('../values');
const database = require('../database');

exports.regsrc = (req,res) => {

    const { subbtn, search, searchbox} = req.body;
    console.log(subbtn + " is subbnt "+ search+" is search pointer "+ searchbox+" is searchbox");


    if(subbtn == "searchbtn"){

        if(!search || !searchbox){
            errordisp("search box is empty");
        }

            database.query('select * from login where state = "s" and '+search+' like ?',['%'+searchbox+'%'], function (error, result) {
                if (error) {
                    console.log(error+" in searchbtn");
                    errordisp("Error in search");
                }else if(!result[0]){
                    errordisp("Login does not exist");
                }else {
                    console.log(result+ " searchbtn register sort and search");
                    res.render('pages/register',{name: values.loginusername, datas: result,msg:"Searched"});
                }
            });

    }
    
    // else if(subbtn == "deletebtn"){

    //     if(!search || !searchbox){
    //         errordisp("search box is empty");
    //     }

    //     database.query('delete from login where '+search+' = ?',[searchbox], function (error, result) {
    //         console.log(result.affectedRows+" res in deletebtn");
    //         if (error) {
    //             console.log(error+" in deletebtn");
    //             errordisp("error in delete");
    //         } else if(result.affectedRows == 0){                   
    //             errordisp("login does not exist to delete");
    //         }else{
    //             console.log(result+ " deletebtn register sort and search");
    //             errordisp("row deleted successfully");
    //         }
    //     });
    // }
    // else if(subbtn == "editbtn"){
    //     if(!search || !searchbox){
    //         errordisp("search box is empty");
    //     }

    //         database.query('select * from login where '+search+' = ?',[searchbox], function (error, result) {
    //             if (error) {
    //                 console.log(error+" in editbtn");
    //                 errordisp("error in editbtn");
    //             } else if(!result[0]){
    //                 errordisp("login does not exist");
    //             }else{
    //                 console.log(result+ " edit register sort and search");
    //                 res.render('pages/editRegister',{name: values.loginusername, datas: result[0], msg: ""});
    //             }
    //         });

    // }
    else{

        database.query('select * from login where state = "s" order by '+ search+' ASC', function (error, result) {
            if (error) {
                console.log(error+" in sortbtn");
                errordisp("Error in sortqty");
            } else if(!result){
                errordisp("No data to sort");
            }else{
                console.log(result+ " sortbtn register sort and search");
                res.render('pages/register',{name: values.loginusername, datas: result,msg:"Sorted"});
            }
        });

    }


    function errordisp(errmsg){

        database.query('select * from login where state = "s"', function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result[0]+ " default login sort and search");
                res.render('pages/register',{name: values.loginusername, datas: result, msg:errmsg});
            }
        });
    }


}