const express = require("express");
var router = express.Router();
const sqlite = require("sqlite3").verbose();
const models = require("../models");
const passport = require("passport");
const connectEnsure = require("connect-ensure-login");
const auth = require("../config/auth");

/* Signup Get */
router.get("/signup", function(req, res, next) {
  res.render("signup");
});
/* Signup Post (Form) using jwt token*/
router.post("/signup", function(req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        res.send("this user already exists");
      } else {
        models.users
          .create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Username: req.body.username,
            Password: hashedPassword
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);

            if (isMatch) {
              const userId = createdUser.UserId;
              console.log(userId);
              const token = auth.signUser(createdUser);
              res.cookie("jwt", token);
              res.redirect("profile/" + userId);
            } else {
              console.error("not a match");
            }
          });
      }
    });
});

/* Indiviual profile by id using jwt token*/
router.get("/profile/:id", auth.verifyUser, function(req, res, next) {
  // if (!req.isAuthenticated()) {
  //   return res.send('You are not authenticated');
  // }
  if (req.params.id !== String(req.user.UserId)) {
    res.send("This is not your profile");
  } else {
    let status;
    if (req.user.Admin) {
      status = "Admin";
      res.render("admin");
    } else {
      status = "Normal user";
      models.posts
        .findAll({
          where: {
            Deleted: false,
            UserId: req.user.UserId
          },
          include: [models.users]
        })
        .then(post => {
          res.render("profile", {
            FirstName: req.user.FirstName,
            LastName: req.user.LastName,
            Username: req.user.Username,
            UserId: req.user.UserId,
            Status: status,
            posts: post
          });
        });
    }
  }
});

/* Login Get (Form) */
router.get("/login", function(req, res, next) {
  res.render("login");
});

/* Login Post (Form) using JWT */
router.post("/login", function(req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      const isMatch = user.comparePassword(req.body.password);

      if (!user) {
        return res.status(401).json({
          message: "Login Failed"
        });
      }
      if (isMatch) {
        const userId = user.UserId;
        const token = auth.signUser(user);
        res.cookie("jwt", token);
        if (user.Admin) {
          res.redirect("admin");
        } else {
          res.redirect("profile/" + userId);
        }
      } else {
        console.log(req.body.password);
        res.redirect("login");
      }
    });
});
/* Admin Get with list of all users not deleted*/
router.get("/admin", function(req, res, next) {
  models.users
    .findAll({
      where: {
        Deleted: false
      }
    })
    .then(usersFound => {
      res.render("admin", {
        users: usersFound
      });
    });
});

/* New Post... Post (Form)*/
router.post("/profile", function(req, res, next) {
  models.posts
    .findOrCreate({
      where: {
        PostTitle: req.body.postTitle,
        PostBody: req.body.postBody,
        UserId: req.body.UserId
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect("profile/" + req.body.UserId);
      } else {
        res.send("Duplicate post");
      }
    });
});

/* GET specificPost */
router.get("/posts/:id", function(req, res, next) {
  let postId = parseInt(req.params.id);
  models.posts
    .find({
      where: {
        PostId: postId
      }
    })
    .then(posts => {
      res.render("specificPost", {
        PostTitle: posts.PostTitle,
        PostBody: posts.PostBody,
        PostId: posts.PostId,
        UserId: posts.UserId
      });
    });
});

/* Update Post by User*/
router.put("/posts/:id", (req, res) => {
  let postId = parseInt(req.params.id);
  models.posts
    .update(
      {
        PostTitle: req.body.postTitle,
        PostBody: req.body.postBody
      },
      {
        where: {
          PostId: postId
        }
      }
    )
    .then(result => {
      res.send();
    });
});
/* Delete Post by User */
router.delete("/posts/:id/delete", (req, res) => {
  let postId = parseInt(req.params.id);
  models.posts
    .update(
      {
        Deleted: "true"
      },
      {
        where: {
          postId: postId
        }
      }
    )
    .then(posts => {
      res.send();
    });
});

/* EDIT USER - Get Route with User info and Post */
router.get("/editUser/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  models.users
    .find({
      where: {
        UserId: userId
      },
      include: [models.posts]
    })
    .then(user => {
      res.render("editUser", {
        UserId: user.UserId,
        Username: user.Username,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Posts: user
      });
    });
});

/* EDIT USER - Delete User by Admin */
router.delete("/editUser/:id/delete", (req, res) => {
  let userId = parseInt(req.params.id);
  models.users
    .update(
      {
        Deleted: "true"
      },
      {
        where: {
          UserId: userId
        }
      }
    )
    .then(post => {
      models.posts
        .update(
          {
            Deleted: "true"
          },
          {
            where: {
              UserId: userId
            }
          }
        )
        .then(user => {
          res.redirect("admin");
        });
    });
});

/* Logout GET */
router.get("/logout", function(req, res) {
  res.cookie("jwt", null);
  res.redirect("/users/login");
});

module.exports = router;
