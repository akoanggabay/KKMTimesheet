const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const wip = require("../wipdb");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const mssql = require('mssql');


router.post("/login", validInfo, async (req, res) => {
  const { idno, password } = req.body;
  
    try {
      await mssql.connect(wip).then(async pool =>  {
        const data = await pool.request()
        .input('userid',mssql.VarChar,idno)
        .query("SELECT * FROM users WHERE idno = @userid and active = 1")
        
        await pool.close();
        if(data.rowsAffected[0] <= 0)
        {
          return res.status(401).json("Id number doesn't exist!");
        }
        const hash = data.recordset[0].password.replace(/^\$2y(.+)$/i, '$2a$1');
  
        await bcrypt.compare(password, hash, function(err, resdata) {
    
          /* if (resdata === false) {
            return res.status(401).json("Invalid Password");
          } */
          const jwtToken = jwtGenerator(
            {
              idno: data.recordset[0].idno,
            }
          );
          return res.json(
            { 
              jwtToken: jwtToken,
              idno: data.recordset[0].idno,
              fname: data.recordset[0].fname,
              lname: data.recordset[0].lname
            }
          );
        });
      })
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    } 
  
});

router.get("/check/:date", async (req, res) => {
  const { idno, com, password } = req.body;
  
    try {
      await pool.query("SELECT * FROM fiscalyear WHERE date = ? and active = 1", [req.params.date],async function(err, result, fields){
          return res.json(result);
      });
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
