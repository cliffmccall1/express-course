var express = require("express");
var router = express.Router();
const sqlite = require("sqlite3").verbose();
const models = require("../models");
const Sequelize = require("sequelize");

/* GET displays all playlist and number of tracks on /playlist */
router.get("/playlist", function(req, res, next) {
  models.playlists.findAll({}).then(playlistsFound => {
    res.render("playlist", {
      playlists: playlistsFound
    });
  });
});

/* GET displays a playlist based on its ID on /playlist/:id */
router.get("/playlist/:id", function(req, res, next) {
  let playlistId = parseInt(req.params.id);
  models.playlists
    .find({
      where: {
        PlaylistId: playlistId
      }
    })
    .then(playlist => {
      res.render("specificPlaylist", {
        playlist: playlist
      });
    });
});

/* POST connected to form to create new playlist on /playlist */
router.post("/playlist", (req, res) => {
  models.playlists
    .findOrCreate({
      where: {
        Name: req.body.name,
        NumberOfTracks: req.body.numberOfTracks
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect("/playlist");
      } else {
        res.send("This playlist exist!");
      }
    });
});

module.exports = router;
