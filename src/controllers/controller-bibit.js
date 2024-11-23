const config = require('../configs/database');
let mysql = require('mysql2');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

