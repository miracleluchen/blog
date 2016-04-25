/**
 * Created by luch on 4/22/16.
 */
var configAuth = require('../config/global');
module.exports = function (app, passport) {
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/backend/auth/google', passport.authenticate('google', {scope: ['email']}));

    // the callback after google has authenticated the user
    app.get('/backend/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/auth/google'
        }));

    app.get('/backend/api/user', function (req, res) {
        if (configAuth.DEV) {
            user = {
                'user': {
                    "google": {
                        "name": "Dev"
                    }
                }
            };
        } else if (req.isAuthenticated()) {
            user = {"user": req.user};
        } else {
            user = {"user": null};
        }
        res.send(user);
    });

    app.get('/backend/logout', function (req, res) {
        req.logout();
        res.redirect("/");
    });
};