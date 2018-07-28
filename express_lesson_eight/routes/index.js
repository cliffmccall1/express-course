const express = require("express");
var router = express.Router();
const sqlite = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
