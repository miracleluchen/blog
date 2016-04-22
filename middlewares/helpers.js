/**
 * Created by luch on 4/21/16.
 */
var configAuth = require('../config/global');
// route middleware to make sure a user is logged in
var helpers = {
    isLogin: function (req, res, next) {
        if (configAuth.DEV) {
            return next();
        }
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.json({
            "login": false
        })
    }
};

module.exports = helpers;
