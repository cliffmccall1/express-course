var express = require("express");
var router = express.Router();
const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("./chinook.sqlite", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Yay! You are connected to the database");
});

router.get("/album/:id", function(req, res, next) {
  let album = parseInt(req.params.id);
  console.log(album);

  let idQuery = `SELECT * FROM albums WHERE AlbumId=${album}`;
  console.log(idQuery);

  db.all(idQuery, (err, row) => {
    console.log(row);
    if (row.length > 0) {
      res.render("specificAlbum", {
        album: row[0]
      });
    } else {
      res.send("not a valid id");
    }
  });
});

const artistList = `SELECT * from albums`;

router.get("/albums", function(req, res, next) {
  db.all(artistList, function(err, row) {
    res.render("albums", {
      albums: row
    });
  });
});

module.exports = router;
