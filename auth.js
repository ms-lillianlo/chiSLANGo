const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./models");
require('dotenv').config()

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
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "https://chislango.herokuapp.com/"
      }, (accessToken, refreshToken, profile, done) => {
          models.User.findOrCreate({
              where: {
                  githubid: profile.id
              },
              defaults: {
                  username: profile.login,
                  githubid: profile.id,
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

app.get('/api/user', (req, res, next) => {
    if (req.user) {
        return res.json({ user: req.user })
    } else {
        return res.json({ user: null })
    }
})

app.get('/login', passport.authenticate('github'));

app.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

/* app.get('/home', ensureAuthenticated, function(req, res) {

}) */

app.get('/github/auth',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        res.redirect('/home');
    })
};

const ensureAuthenticated = (req, res, next) => {
if (req.isAuthenticated()) {
    return next();
}
res.redirect('/login');
}

module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;
