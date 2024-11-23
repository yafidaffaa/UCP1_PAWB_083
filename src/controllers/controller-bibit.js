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

    saveBibit(req, res) {
        let { nama, jenis, status } = req.body;
        console.log(nama, jenis, status);
    
        if (nama && jenis && status) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO bibit (nama, jenis, status) VALUES (?, ?, ?);`,
                    [nama, jenis, status],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        res.redirect('/bibit?status=success'); 
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },

    editBibit(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM bibit WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editBibit', {
                        url: 'http://localhost:8000/',
                        bibit: results[0] 
                    });
                } else {
                    res.redirect('/bibit');
                }
            });
            connection.release();
        });
    },
};  