var mysql = require('mysql');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();


app.use(bodyparser.json());

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ethio coffee"
});

con.connect((err)=>{
    if(!err)
    console.log("DB connection succeded");
    else
    console.log("DB connection failed error :\n"+JSON.stringify(err));

});

//to start a server
app.listen(4000, ()=>console.log("the server start on port of 4000 "));

// app.get('/products', (req, res)=>{

//     con.query('SELECT * FROM coffe_product',(err, rows, fields)=>{
//         if(!err)
//         res.send(rows);
//         else
//         console.log(err);
//     });
// });


// display data by id
app.get('/products/:id', (req, res)=>{

    con.query('SELECT * FROM coffe_product WHERE id =?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
}); 

// delete data by id
app.delete('/products/:id', (req, res)=>{

    con.query('DELETE FROM coffe_product WHERE id =?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        res.send("Data deleted");
        else
        console.log(err);
    });
});



// insert data 
app.post('/products', (req, res)=>{
    
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var last = req.body.last;
   
    console.log(name, email, password);
    var today = new Date();
    con.query('INSERT INTO users (first_name, last_name, email, password, created) VALUES ?',("nam" ,"last", "email",  "password", today) ,function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          console.log('The solution is: ', results);
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
        }
        });
});


// update data 
app.put('/products', (req, res)=>{
    let emp = req.body;
    var sql = "INSERT INTO coffe_product (coffeName, price, info) VALUES ('worka coffe', '115','asdfghjk')";
   con.query(sql,(err, rows, fields)=>{
       if(!err){
      rows.forEach(element => {
          if(element.constructor == Array)
           res.send('Inserted products id:' +element[1].id);
      });
   }
       else
       console.log(err);
   });
});
