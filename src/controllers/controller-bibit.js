const config = require('../configs/database');
let mysql = require('mysql2');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getBibit(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit;', function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    res.render('bibit', {
                        url: 'http://localhost:8000/',
                        bibit: results 
                    });
                } else {
                    res.render('bibit', {
                        url: 'http://localhost:8000/',
                        bibit: [] 
                    });
                }
            });
            connection.release();
        });
    },

    formBibit(req, res) {
        res.render("addBibit", {
            url: 'http://localhost:8000/',
        });
    },
};  