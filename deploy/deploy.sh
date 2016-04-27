#!/usr/bin/env bash

mkdir -p /var/www/blog.lemontu.com

cd ~/workspace/blog/web
grunt build
cp -rf dist/* /var/www/blog.lemontu.com/

pm2 restart 0

