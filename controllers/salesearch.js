const values = require('../values');
const shopselector = require('./shopselector');
const database = require('../database');

exports.salesrc = (req,res) => {

    const { subbtn, search, searchbox} = req.body;
    console.log(subbtn + " is subbnt "+ search+" is search pointer "+ searchbox+" is searchbox");

    if(subbtn == "searchbtn"){

        if(!search || !searchbox){
            errordisp("Search box is empty");
        }

        shopselector.currentshop(function(response){
            mainquery(response)
        });

        function mainquery(reshopid){
            database.query('select * from sales where shop_id = ? and state = "s" and '+search+' like ?',[reshopid, '%'+searchbox+'%'], function (error, result) {
                if (error) {
                    console.log(error+" in searchbtn");
                    errordisp("Error in search");
                }else if(!result[0]){
                    errordisp("Sale does not exist");
                }else {
                    console.log(result+ " searchbtn sale sort and search");
                    res.render('pages/sales',{name: values.loginusername, datas: result,msg:"Searched", role: values.role});
                }
            });
        }

    }
    // else if(subbtn == "deletebtn"){

    //     if(!search || !searchbox){
    //         errordisp("search box is empty");
    //     }

    //     shopselector.currentshop(function(response){
    //         mainquery(response)
    //     });

    //     function mainquery(reshopid){
    //         database.query('delete from sales where shop_id = ? and '+search+' = ?',[reshopid, searchbox], function (error, result) {
    //             console.log(result.affectedRows+" res in deletebtn");
    //             if (error) {
    //                 console.log(error+" in deletebtn");
    //                 errordisp("error in delete");
    //             } else if(result.affectedRows == 0){                   
    //                 errordisp("sale does not exist to delete");
    //             }else{
    //                 console.log(result+ " deletebtn sale sort and search");
    //                 errordisp("row deleted successfully");
    //             }
    //         });
    //     }

    // }
    else{

        shopselector.currentshop(function(response){
            mainquery(response)
        });

        function mainquery(reshopid){
            database.query('select * from sales where shop_id = ? and state = "s" order by '+ search+' ASC',[reshopid], function (error, result) {
                if (error) {
                    console.log(error+" in sortbtn");
                    errordisp("Error in sortqty");
                } else if(!result){
                    errordisp("No data to sort");
                }else{
                    console.log(result+ " sortbtn sale sort and search");
                    res.render('pages/sales',{name: values.loginusername, datas: result,msg:"Sorted", role: values.role});
                }
            });
        }

    }



    function errordisp(errmsg){

        function mainquery1(reshopid){
            database.query('select * from sales where shop_id = ? and state = "s"',[reshopid], function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result[0]+ " default sales sort and search");
                    res.render('pages/sales',{name: values.loginusername, datas: result, msg:errmsg, role: values.role});
                }
            });
        }
        shopselector.currentshop(function(response){
            mainquery1(response)
        });
    }

}