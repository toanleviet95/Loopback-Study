'use strict';
const loopback = require('loopback');
const fs = require('fs');
const async = require('async');
const SchemaClass = require('./classes/schema-class');
const args = process.argv.slice(2);

// Command: node server/bin/create-schema.js --type mysql --ds hackathon_social_intranet --tables comments, posts

if (args[0] === '--type' && args[1] === 'mysql' && args[2] === '--ds' && args[3]) {
    let text = fs.readFileSync('./server/datasources.json', 'utf8')
    let data = JSON.parse(text);
    let datasource = loopback.createDataSource(args[1], data[args[3]]);

    if (args[4] === '--tables') {
        let arrTables = args[5].split(',');
        async.each(arrTables, function(table, callback) {
                SchemaClass.createSchema(datasource, table, (error, result) => {
                    if (error) {
                        throw error;
                    }
                    result['base'] = 'PersistedModel';
                    result['plural'] = table;
                    result['validations'] = [];
                    result['relations'] = {};
                    result['acls'] = [];
                    result['methods'] = {};
                    fs.writeFile('./common/models/' + table + '.json', JSON.stringify(result), (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log('"' + table + '"' + ' was created !!!');
                    });
                });
            },
            function(err) {
                throw err;
            });
    }
}