/**
 * Created by luch on 4/20/16.
 */
var env = {};

env.CLIENT_ID = '267641397379-23gaircjeqacktgvtrc659q3831c9qeq.apps.googleusercontent.com';
env.SECRET_KEY = 'Hld3CbjkOXjP2PffAyW_ucaU';
env.REDIRECT_URL = 'http://blog.lemontu.com/backend/auth/google/callback';
env.DEV = false;
env.DB_ADDR = 'mongodb://localhost/blog';
env.DB_OPTIONS = {
    user: 'blog',
    pass: '123456'
};

module.exports = env;


