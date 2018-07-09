'use strict';

const psql = require('./db/config/psql_client');
const psql_utils = require('./db/actions/utils');

const express = require('express');
const app = express();


psql_utils.db_connection();


app.get('/', function (req, res) {
   res.send("home")
})

app.get('/testQuery', function (req, res) {
    //TODO : remove >>> TEST ONYL
    psql.Client.query('SELECT * FROM department', (err, data) => {
        if(err){
            res.status(400).json({error:true, data: err})
        } else {
            res.status(200).json({error:false, data: data.rows})
        }
    });
});



app.get('/department/:id', function(req,res){
   const deptId = req.params.id;

   //override query method to be async query
   async function performQueryAsync(){
       try {
           let result = await psql.Client.query("SELECT * from department WHERE id = $1", [deptId]);
            return result.rows;
       } catch(e){
           return e;
       }
   }

   performQueryAsync()
       .then(function(rows){
           res.status(200).json({error:false, data:rows})
       })
       .catch(function(err){
           res.status(400).json({error:true, data:err})
       })
});


app.get('/department/get/list', function(req,res){

    //override query method to be async query
    async function performQueryAsync(){
        try {
            let result = await psql.Client.query("SELECT * FROM department");
            return result.rows;
        } catch(e){
            return e;
        }
    }

    performQueryAsync()
        .then(function(rows){
            res.status(200).json({error:false, data:rows})
        })
        .catch(function(err){
            res.status(400).json({error:true, data:err})
        })
});


app.listen(4242);