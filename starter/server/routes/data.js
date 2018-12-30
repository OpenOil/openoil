const express = require("express");
const router = express.Router();
const sql = require("mssql");

const config = {
  server: "66.171.244.27",
  database: "OilData",
  user: "openoil",
  password: "Op3nOil!",
  port: 49172
};

/*
const sqlConn = new sql.ConnectionPool(config);

sqlConn
  .connect()
  .then(function() {
    var request = new sql.Request(sqlConn);
    request
      .query("SELECT TOP 1 * FROM Well_Header")
      .then(function(recordSet) {
        console.log(recordSet);
        sqlConn.close();
      })
      .catch(function(err) {
        console.log(err);
        sqlConn.close();
      });
  })
  .catch(function(err) {
    console.log(err);
  });
  */

router.get("/getData", function(req, res) {
  const sqlConn = new sql.ConnectionPool(config);

  sqlConn
    .connect()
    .then(function() {
      var request = new sql.Request(sqlConn);
      request
        .query("EXEC sp_GetData")
        .then(function(data) {
          //console.log(data.recordset);
          res.json(data.recordset);
          sqlConn.close();
        })
        .catch(function(err) {
          console.log(err);
          sqlConn.close();
        });
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
