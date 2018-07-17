var express = require("express");
var router = express.Router();
var storyLine = require("../models/storyLine");

router.get("/beginning", (req, res) => {
  let beginning = storyLine.story.find(story => {
    return story.storyPart === "beginning"
  })
  res.render("beginning", { beginning });
});

router.get("/middle", (req, res) => {
  let middle = storyLine.story.find(story => {
    return story.storyPart === "middle"
  })
  res.render("middle", { middle });
});


router.get("/end", (req, res) => {
  let end = storyLine.story.find(story => {
    return story.storyPart === "end"
  })
  res.render("end", { end });
});

module.exports = router;
