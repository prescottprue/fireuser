# Fireuser
[![npm version](https://img.shields.io/npm/v/fireuser.svg?style=flat-square)](https://www.npmjs.com/package/fireuser)
[![npm downloads](https://img.shields.io/npm/dm/fireuser.svg?style=flat-square)](https://www.npmjs.com/package/fireuser)
[![build status](https://img.shields.io/travis/prescottprue/fireuser/master.svg?style=flat-square)](https://travis-ci.org/prescottprue/fireuser)
[![dependencies status](https://img.shields.io/david/prescottprue/fireuser/master.svg?style=flat-square)](https://david-dm.org/prescottprue/fireuser)
[![codeclimate](https://img.shields.io/codeclimate/github/prescottprue/fireuser.svg?style=flat-square)](https://codeclimate.com/github/prescottprue/fireuser)
[![coverage](https://img.shields.io/codeclimate/coverage/github/prescottprue/fireuser.svg?style=flat-square)](https://codeclimate.com/github/prescottprue/fireuser)
[![license](https://img.shields.io/npm/l/fireuser.svg?style=flat-square)](https://github.com/prescottprue/fireuser/blob/master/LICENSE)

| Fireuser is a user/session/presense wrapper for [Firebase](http://firebase.com)

Fireuser is a Javascript Library built to simplify implementing standard app functionality when using Firebase (User/Presence Management, Object CRUD/ Listing/Counting).

Fireuser is especially useful when you are trying to administer a Firebase data set (hence the name). Administration dashboards are a breeze thanks to functions like `getOnlineUserCount()` that provide analytics data in simple and easy to understand calls.

## Features
* Authentication pared to user management
* User Profile created on signup
* Session management
* Descructured Population based on ID
* Role management


## Getting Started

1. Include the Fireuser bundle in your `index.html` :

  ```html
  <script src="http://cdn.prue.io/fireuser/0.0.1/fireuser.min.js"></script>
  <!-- Or the following for the latest version -->
  <!-- <script src="http://cdn.prue.io/fireuser/latest/fireuser.min.js"></script> -->

  ```
**or**
Install through package managers:
`npm install fireuser --save`
`bower install fireuser --save`

2. Create a new Fireuser Object:

  ```javascript
var fireuser = new Fireuser("https://<your-app>.firebaseio.com");
  ```

3. Start using Fireuser!
    ```javascript
    //Get count of users
    fa.getUserCount().then(function(count){
        console.log('Your app currently has ' + count + ' users.');
    });
    ```

## [API Documentation](http://cdn.prue.io/fireuser/latest/docs/class/src/fireuser.js~Fireuser.html)
#### [Docs Page](http://cdn.prue.io/fireuser/latest/docs/index.html)

API Documentation is automatically generated with JSDoc and is included in this repo under `dist/docs` if you would like to view a local version.



## Contributing

1. Fork repository
2. Run `npm install` to install dev dependencies.
3. Run `npm start` to Serve and Open the dev environment.

## Planning
* Role Management
* Automatic Rules Setup
* Admin Parameter
