var express = require("express");
var router = express.Router();
const sqlite = require("sqlite3").verbose();
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/* GET home page. */
router.get("/artists", function(req, res, next) {
  models.artists.findAll({}).then(artistAsPlainObject => {
    const mappedArtists = artistAsPlainObject.map(artist => ({
      ArtistId: artist.ArtistId,
      Name: artist.Name
    }));
    res.send(JSON.stringify(mappedArtists));
  });
});

router.get("/specificArtist", function(req, res, next) {
  models.artists
    .find({
      where: {
        ArtistId: 270
      }
    })
    .then(artist => {
      res.render("specificArtist", {
        artist: artist
      });
    });
});

router.get("/rollingStones", function(req, res, next) {
  models.artists
    .find({
      where: {
        ArtistId: 142
      }
    })
    .then(artist => {
      res.render("rollingStones", {
        artist: artist
      });
    });
});

router.get("/artists/:id", function(req, res, next) {
  let artistId = parseInt(req.params.id);
  models.artists
    .find({
      where: {
        ArtistId: artistId
      }
    })
    .then(artist => {
      res.render("specificArtist", {
        artist: artist
      });
    });
});

router.post("/artists", (req, res) => {
  models.artists
    .findOrCreate({
      where: {
        Name: req.body.name,
        DateFormed: req.body.dateFormed
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect("/artists");
      } else {
        res.send("This artist already exists!");
      }
    });
});

module.exports = router;
