#!/bin/bash

echo "Running front end tests for Stackle using Protractor";
cd node_modules/protractor/example;
protractor conf.js;
echo "Tests Ended";
