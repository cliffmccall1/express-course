var express = require("express");
var router = express.Router();
var staticModels = require("../staticModels/planets");
const sqlite = require("sqlite3").verbose();
var models = require("../models");

// router.get("/staticPlanets", function(req, res, next) {
//   let planets = staticModels.planet;
//   res.render("index", {
//     planets
//   });
// });

router.get("/planets", function(req, res, next) {
  models.planets.findAll({}).then(planetAsPlainObject => {
    const mappedPlanets = planetAsPlainObject.map(planet => ({
      id: planet.id,
      name: planet.name,
      numberOfMoons: planet.numberOfMoons
    }));
    res.send(JSON.stringify(mappedPlanets));
  });
});

module.exports = router;
