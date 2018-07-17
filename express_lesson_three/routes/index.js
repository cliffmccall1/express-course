var express = require("express");
var router = express.Router();
var users = require("../models/users");

/* GET home page. */
router.get("/person/:id", function(req, res, next) {
  //get object that matches the id
  let person = users.people.find(peep => {
    return peep.id === parseInt(req.params.id);
  });
  // render the template with that object
  res.render("index", { person });
  console.log(req.url);
});

module.exports = router;
