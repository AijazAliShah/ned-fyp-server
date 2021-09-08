var mysql   = require("mysql2");

var pool = mysql.createPool({
    connectionLimit : 10,
    host: "us-cdbr-east-04.cleardb.com",
    user: "bbea3554c54381",
    password: "9632a50a",
    database: "heroku_2da99798871307c",
    port: 3306,
});


var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;