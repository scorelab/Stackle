# Introduction
Stackle is an web communication portal aimed at providing Open Source organizations a platform to have discussions on their GitHub projects and their issues. It provides GitHub integration which allows administrator of an organization to create a forum thread for the particular organization. Users signing in is able to view forums of the organizations they contribute to and engage in the forum discussions.

# Implementation Details
MEAN stack is used for developing Stackle. 
 - Front-End is developed using AngularJS
 - Back-end is handled by NodeJS using Express
 - MongoDB is used as the databases for storing data related to stackle

# Architecture
Users interact with the application through the AngularJS front-end which communicates with Node-API to get and post data to the MongoDB server. The front-end also communicates with GitHub API to get data related to Users, repositories and organizations. Users can login to the application through auth0 login integrated to Stackle.

***

#Setting Up the Project
These are the instructions on how to setup the project locally.

## Pre-requisites
* NodeJS 6.X or higher
* MongoDB Community edition

## Stackle API
1. `cd` in to the **stackle_api** directory.
2. Run `npm install` to install the packages required. 
3. once all the packages are installed run `npm start`

### Stackle App
1. `cd`in to the **stackle_app** directory
2. run `npm install` to install the packages required.
3. Once all the packages are installed, run `gulp serve`

# Running with Docker
1. Change the url in the database config file in stackle_api/config/database.js  as `url : 'mongodb://mongo:27017/stackle'`
2. In the root of the Stackle directory, run `docker-compose build`
3. Once build completes, run `docker-compose up`


