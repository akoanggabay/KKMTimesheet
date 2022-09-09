const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
//const sql = require("mssql");
const app = express();
const port = 5678;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use("/api/v1/logs", require("./routes/logs"));
app.use("/api/v1/auth", require("./routes/jwtAuth"));
//app.use("/api/v1/request", require("./routes/request"));
app.use("/dashboard", require("./routes/dashboard"));
//app.use("/api/v1/dropdown", require("./routes/dropdown"));
//app.use("/api/v1/transaction", require("./routes/transactiontype"));
//app.use("/api/v1/user", require("./routes/user"));

process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----')
  console.log(error)
  console.log('----- Exception origin -----')
  console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----')
  console.log(promise)
  console.log('----- Reason -----')
  console.log(reason)
})

setInterval(() => {
  console.log('app still running')
}, 1000 * 60 * 60)

var date = new Date().addDays(5).toLocaleString().split(",")[0];
var currdate = date.split("/")[1]+"-"+date.split("/")[0]
//console.log(currdate)

/* https.createServer({
  
}, app).listen(5000, () => {
  console.log(`App listening on port 5000!`)
}) */
app.listen(port, function() {
  console.log(`App listening on port ${port}!`)
});