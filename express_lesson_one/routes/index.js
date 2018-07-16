var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', {
    title: 'My Cats',
    cats: [{name: 'Jessica'}, {name: 'Ken'}, {name: 'Anthony'}, {name: 'Clara'}]
  });
});

module.exports = router;
