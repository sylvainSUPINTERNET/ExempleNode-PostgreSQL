'use strict';

const { Client } = require('pg');

//dev
const pool ={
    user: '',
    host: 'localhost',
    database: 'template1',
    password: '',
    port: 5432
};
const client = new Client(pool);

module.exports = {
    Pool: pool, //coinfig infos
    Client : client //client psql
};





