const sql = require("mssql");


const config = {
    user: 'duane',
    password: "duanepogi",
    server: "10.168.5.15\\SQLWIP",
    database: "WIP",
    port: 1433,
    options: {
        encrypt: false,
    }
};

/* let pool = sql.connect(config, function (err) {
    
    if (err) console.log(err.message);

    // create Request object
    else console.log('Connected to Microsoft WIP SQL Database!');
    
}); */

module.exports = config;
