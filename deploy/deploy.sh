# /bin/bash

mkdir /var/www/blog.lemontu.com

cd ../web
grunt build
cp -rf dist/* /var/www/blog.lemontu.com/

cd ..
pm2 start app.js