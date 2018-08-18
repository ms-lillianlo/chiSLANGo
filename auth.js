const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./models");

//const Sequelize = require('sequelize');

const setupAuth = (app) => {
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
        callbackURL: "http://localhost:3001/auth/github/login"
      }, (accessToken, refreshToken, profile, done) => {
          models.User.findOrCreate({
              where: {
                  githubId: profile.id
              },
              defaults: {
                  username: profile.login,
                  githubId: profile.id,
                  email: profile.email,
              }
          })
          .then(result => {
              return done(null, result[0]);
          })
          .catch(done);
      }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/redirect',
      passport.authenticate('github', {
          // if this works, redirect back to the react app homepage
          successRedirect: '/',
          // otherwise, go to the react app login
          failureRedirect: '/login',
      })
  );
}

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/about");
};
module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;
