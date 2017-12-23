#!/bin/bash

echo "Running front end tests for Stackle using Protractor";
cd stackle_app;
protractor conf.js;
echo "Tests Ended";
