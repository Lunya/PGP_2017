#!/usr/bin/env sh

cd /home/node/front
npm install
npm run-script build

cd /home/node/app
npm install
npm start
