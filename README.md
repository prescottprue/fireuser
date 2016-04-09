# Fireuser

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

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

1. Install through npm:

  `npm install fireuser --save`

  **or**

  Include the Fireuser bundle in your `index.html` :

    ```html
    <script src="http://cdn.prue.io/fireuser/0.0.3/fireuser.min.js"></script>
    <!-- Or the following for the latest version -->
    <!-- <script src="http://cdn.prue.io/fireuser/latest/fireuser.min.js"></script> -->
    ```

2. Create a new Fireuser Object:

  ```javascript
var fireuser = new Fireuser("https://<your-app>.firebaseio.com");
  ```

3. Start using Fireuser!

  ```javascript
  //Get count of users
  fireuser.signup({
    username: 'testuser',
    email: 'some@email.com',
    password: 'asdfasdf'
  }).then(function(count){
    console.log('Login was successful');
  });
  ```

## [Documentation](https://prescottprue.gitbooks.io/fireuser/content/)

## Contributing

1. Fork repository
2. Run `npm install` to install dev dependencies.
3. Run `npm run build` to build library (NodeJS version in `dist`, UMD/Browser version in Dist)
4. Run `npm start` to Serve a live/hot reloading dev environment

[npm-image]: https://img.shields.io/npm/v/fireuser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fireuser
[npm-downloads-image]: https://img.shields.io/npm/dm/fireuser.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/prescottprue/fireuser/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/fireuser
[daviddm-image]: https://img.shields.io/david/prescottprue/fireuser.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/fireuser
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/fireuser.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/fireuser
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/prescottprue/fireuser.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/prescottprue/fireuser
[license-image]: https://img.shields.io/npm/l/fireuser.svg?style=flat-square
[license-url]: https://github.com/prescottprue/fireuser/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
