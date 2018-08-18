const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./models");

//const Sequelize = require('sequelize');

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
        clientID: "9c6f9733180638093a3e",
        clientSecret: "dd3676a334855c0b6db74e7550f38627d112c93c",
        callbackURL: "https://chislango.herokuapp.com/github/auth"
      },
      (accessToken, refreshToken, profile, done) => {
        models.User.findOrCreate({
          where: {
            githubid: profile.id,
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

  app.get("/login", passport.authenticate("github"));

  app.get("/logout", function(req, res, next) {
    req.logout();
    res.redirect("/");
  });

  app.get(
    "/github/auth",
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
  res.redirect("/home");
};
module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;
