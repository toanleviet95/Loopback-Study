var SchemaClass = {
    createSchema: function(datasource, table, callback) {
        datasource.discoverSchema(table, {}, (err, res) => {
            if (err) {
                console.log('Cannot create schema model "Post"');
                return callback(err, null);
            }
            callback(null, res);
        });
    },

    discoverAndBuildModels: function(datasource, table, callback) {
        datasource.discoverAndBuildModels(table, {
            visited: {},
            associations: true
        }, (err, res) => {
            console.log(res);
        });
    },

    discoverAndBuildModels: function(datasource, table, callback) {
        datasource.discoverAndBuildModels(table, {
            visited: {},
            associations: true
        }, (err, res) => {
            console.log(res);
        });
    },

    discoverModelDefinitions: function(datasource, table, callback) {
        datasource.discoverModelDefinitions({
            views: true,
            limit: 20
        }, (err, models) => {
            console.log(models);
        });
    },

    discoverModelProperties: function(datasource, table, callback) {
        datasource.discoverModelProperties(table, (err, res) => {
            console.log(res);
        });
    },

    discoverPrimaryKeys: function(datasource, table, callback) {
        datasource.discoverPrimaryKeys(table, (err, res) => {
            console.log(res);
        });
    },

    discoverForeignKeys: function(datasource, table, callback) {
        datasource.discoverForeignKeys(table, (err, res) => {
            console.log(res);
        });
    },

    discoverExportedForeignKeys: function(datasource, table, callback) {
        datasource.discoverExportedForeignKeys(table, (err, res) => {
            console.log(res);
        });
    }
};

module.exports = SchemaClass;