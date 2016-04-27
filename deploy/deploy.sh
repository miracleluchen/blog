#!/usr/bin/env bash

mkdir -p /var/www/blog.lemontu.com

cd ../web
/home/luchen/node/bin/grunt build
cp -rf dist/* /var/www/blog.lemontu.com/

/home/luchen/node/bin/pm2 restart 0

