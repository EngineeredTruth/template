const express = require('express');
const session = require('express-session');
const path = require('path');

const config = require('./config.json');

const app = module.exports = express();

app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: true
}));

app.use(express.static(__dirname + '/../public')); //location of index.html for node to serve


var Auth0Strategy = require('passport-auth0'),
    passport = require('passport');

var strategy = new Auth0Strategy({
   domain:       'config.authDomain',
   clientID:     'config.authId',
   clientSecret: 'config.authSecret',
   callbackURL:  '/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/");
  }
);

app.get('/login',
  passport.authenticate('auth0', {}), function (req, res) {
  res.redirect("/");
});

passport.use(strategy);


app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });