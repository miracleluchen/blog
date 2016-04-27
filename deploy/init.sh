#!/usr/bin/env bash
# Please execute the script after installing node, mongodb...

npm install pm2 -g
npm install -g bower
npm install -g grunt-cli
sudo apt-get install ruby
sudo gem install compass


# install express related
cd ..
npm install

# install angular related
cd web

npm install
bower install


