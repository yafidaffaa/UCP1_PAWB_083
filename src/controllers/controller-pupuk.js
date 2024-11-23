const config = require('../configs/database');
let mysql = require('mysql2');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getPupuk(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk;', function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    res.render('pupuk', {
                        url: 'http://localhost:8000/',
                        pupuk: results 
                    });
                } else {
                    res.render('pupuk', {
                        url: 'http://localhost:8000/',
                        pupuk: [] 
                    });
                }
            });
            connection.release();
        });
    },

    formPupuk(req, res) {
        res.render("addPupuk", {
            url: 'http://localhost:8000/',
        });
    },

    savePupuk(req, res) {
        let { merek, harga, berat } = req.body;
        console.log(merek, harga, berat);
    
        if (merek && harga && berat) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO pupuk (merek, harga, berat) VALUES (?, ?, ?);`,
                    [merek, harga, berat],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        res.redirect('/pupuk?status=success'); 
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },    

    editPupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM pupuk WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editPupuk', {
                        url: 'http://localhost:8000/',
                        pupuk: results[0] 
                    });
                } else {
                    res.redirect('/pupuk');
                }
            });
            connection.release();
        });
    },

    updatePupuk(req, res) {
        const { id } = req.params;
        const { merek, harga, berat } = req.body;

        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE pupuk SET merek = ?, harga = ?, berat = ? WHERE id = ?',
                [merek, harga, berat, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/pupuk'); 
                }
            );
            connection.release();
        });
    },

    deletePupuk(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM pupuk WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/pupuk'); 
            });
            connection.release();
        });
    },
};
