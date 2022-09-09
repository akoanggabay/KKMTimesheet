const router = require("express").Router();
const authorize = require("../middleware/authorize");
const wip = require("../wipdb");
const mssql = require("mssql");

router.post("/", authorize, async (req, res) => {

  try {
    await mssql.connect(wip).then(async pool =>  {
      const data = await pool.request()
      .input('userid',mssql.VarChar,req.user.id.idno)
      .query("SELECT * FROM users WHERE idno = @userid and active = 1")

      await pool.close();
      if(data.rowsAffected[0] <= 0)
      {
        return res.status(401).json("Id number doesn't exist!");
      }
        return res.json(
          { 
            idno: data.recordset[0].idno,
            fname: data.recordset[0].fname,
            lname: data.recordset[0].lname
          }
        );
      
    })
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  } 
});

module.exports = router;