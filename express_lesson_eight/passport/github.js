var GithubStrategy = require("passport-github").Strategy;
var models = require("../models");
const passport = require("passport");

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "115cdf13a188642ba0b8",
      clientSecret: "6cf375c3b22e646becb5292235f724832da30ec4",
      callbackURL: "http://localhost:3000/users/login/github/callback"
    },

    function(access_token, refresh_token, profile, done) {
      models.users
        .findOne({
          where: {
            AuthId: profile.id
          }
        })
        .then(user => {
          let name = profile.displayName;
          let [firstName, ...lastName] = name.split(" ");
          lastName = lastName.join(" ");
          if (!user) {
            return models.users
              .create({
                AuthId: profile.id,
                FirstName: firstName,
                LastName: lastName
              })
              .then(user => {
                done(null, user);
              });
          } else {
            done(null, user);
          }
        })
        .catch(err => {
          if (err) {
            console.log("error");
            return done(err);
          }
        });
    }
  )
);
