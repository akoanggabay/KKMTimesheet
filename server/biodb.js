const sql = require("mssql");


const config = {
    user: 'duane',
    password: "duanepogi",
    server: "localhost\\SQLexpress",
    database: "Bio",
    port: 1433,
    options: {
        encrypt: false,
    }
};

/* let pool = sql.connect(config, function (err) {
    
    if (err) console.log(err.message);

    // create Request object
    else console.log('Connected to Microsoft SQL Database!');
    
}); */

module.exports = config;
