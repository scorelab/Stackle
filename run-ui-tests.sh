#!/bin/bash
cd stackle_app;
sudo npm i -D cypress --unsafe-perm;
sudo $(npm bin)/cypress open;
sudo cp Stackle_test.js cypress/integration;

