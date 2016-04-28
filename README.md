# fair-manager

[![Build Status](https://travis-ci.com/apals/FairManager.svg?token=wnF5zpGmFJf9tfauhzAP&branch=master)](https://travis-ci.com/apals/FairManager) 
[![devDependency Status](https://david-dm.org/apals/FairManager/dev-status.svg)](https://david-dm.org/apals/FairManager#info=devDependencies)
[![Dependency Status](https://david-dm.org/apals/FairManager.svg)](https://david-dm.org/apals/FairManager)

Welcome to FairManager, an administrative service to handle and manage companies, events, user and much more for your event.

## Generating tool

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.3.0

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.


## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.



## To add new views


In order to add a new view in the front-end, do the following

1. Create a folder with the view-name in client/app/

2. In this folder, create 3 files: the .html-file, the .controller.js (with the naming convention) file, and a .js file

3. The .js file should contain the route logic, see for example https://github.com/apals/FairManager/blob/master/client/app/settings/settings.js

4. If you want to add this to the navbar in the top, find navbar.controller.js in client/components/navbar and add it to the menu-list

