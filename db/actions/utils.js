'use strict';

const psql = require('../config/psql_client');


module.exports = {
    db_connection: function(){
        return psql.Client.connect();
    },
    db_disconnect: function(){
        return psql.Client.end()
    },
    db_infos: function(){
        return psql.Pool;
    },
    db_client_infos: function(){
        return psql.Client;
    }

}