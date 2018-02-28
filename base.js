/*jshint esversion: 6 */
// Connect to mysql database...
const mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 100,
  host: '10.10.1.24',
  user: 'root',
  password: 'password',
  database: 'steemBotDB',
  debug: false
});

var steemBotDB = (function () {

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
    }

    return {
        query: _query
    };
})();

module.exports = steemBotDB;
