const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const models = require("./models");

//const Sequelize = require('sequelize');

const setupAuth = app => {
  app.use(cookieParser());

  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "secret",
      resave: true,
      saveUninitialized: true
    })
  );

  app.use(
    session({
      secret: "secretCode",
      resave: true,
      saveUninitialized: true
    })
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret,
        callbackURL: "https://chislango.herokuapp.com/login/facebook/return"
      },
      function(accessToken, refreshToken, profile, done) {
        //check user table for anyone with a facebook ID of profile.id
        User.findOne(
          {
            facebookid: profile.id
          },
          function(err, user) {
            if (err) {
              return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
              user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: "facebook",
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                facebook: profile._json
              });
              user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
              });
            } else {
              //found user. Return
              return done(err, user);
            }
          }
        );
      }
    )
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/", function(req, res) {
    res.render("home", { user: req.user });
  });

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/login/facebook", passport.authenticate("facebook"));

  app.get(
    "/login/facebook/return",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.get(
    "/profile",
    require("connect-ensure-login").ensureLoggedIn(),
    function(req, res) {
      res.render("profile", { user: req.user });
    }
  );
};
module.exports = setupAuth;
module.exports.ensureAuthenticated = ensureAuthenticated;
