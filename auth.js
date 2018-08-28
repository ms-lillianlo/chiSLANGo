const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./models");
require('dotenv').config()

const Sequelize = require('sequelize');

const setupAuth = app => {
  app.use(cookieParser());

  app.use(
    session({
      secret: "secretCode",
      resave: true,
      saveUninitialized: true
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "https://chislango.herokuapp.com/auth/github"
      },
      (accessToken, refreshToken, profile, done) => {
        models.User.findOrCreate({
          where: {
            githubId: profile.id,
            username: profile.username
          }
        })
          .then(result => {
            return done(null, result[0]);
          })
          .catch(err => {
            // .catch(done);
            done(err);
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  //app.get("/login", passport.authenticate("github"));

  app.get("/logout", function(req, res, next) {
    req.logout();
    res.redirect("/");
  });

  app.get(
    "/auth/github",
    passport.authenticate("github", {
      failureRedirect: "/login"
    }),
    (req, res) => {
      res.redirect("/home");
    }
  );
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;
