var es = require('event-stream');
module.exports = function(app) {
    var Posts = app.models.Posts;
    Posts.createChangeStream(function(err, changes) {
        // changes.pipe(es.stringify()).pipe(process.stdout);
    });
}