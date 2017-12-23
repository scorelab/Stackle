#!/bin/bash

echo "Running front end tests for Stackle using Protractor";
cd protractor/example;
protractor conf.js;
echo "Tests Ended";
