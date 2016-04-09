import Firebase from 'firebase'
import { isString } from 'lodash'
import { listNames } from '../config'

export default (url) => {
  let currentUser = null
  let rootRef = new Firebase(url)

  let methods = {
    get currentUser () {
      return (!rootRef.getAuth() || !currentUser) ? null : currentUser
    },

    getCurrentUser: function () {
      if (!rootRef.getAuth()) return Promise.reject({ message: 'Authentication is required.', status: 'UNAUTHORIZED' })
      if (currentUser) return Promise.resolve(currentUser)
      return rootRef.child(listNames.users)
        .child(rootRef.getAuth().uid)
        .once('value')
        .then(snap => currentUser = snap.val())
    },

    logout: function () {
      if (!rootRef.getAuth()) return
      return rootRef.unauth()
    },

    /** Modified version of Firebase's authWithPassword that handles presence
     * @param {Object} loginData Login data of new user
     * @return {Promise}
     */
    emailAuth: function (loginData) {
      const { username, name, email } = loginData
      if (!email) return Promise.reject({ message: 'Username is required' })
      return rootRef.authWithPassword(loginData).then(authData => {
        this.setupPresence(authData.uid)
        // [TODO] Check for account/Add account if it doesn't already exist
        let profileData = { email }
        if (username) profileData.username = username
        if (name) profileData.name = name
        return Object.assign({}, profileData, authData)
      })
    },

    /** Modified version of Firebase's authWithOAuthPopup function that handles presence
     * @param {String} provider - Login data of new user. `Required`
     */
    authWithOAuthPopup: function (provider) {
      if (!provider || !isString(provider)) return Promise.reject({ message: 'Provider required to auth.', status: 'NULL_PROIVDER' })
      // [TODO] Check enabled login types
      return rootRef.authWithOAuthPopup(provider).then(authData => {
        this.setupPresence(authData.uid)
        // [TODO] Check for account/Add account if it doesn't already exist
        return authData
      }, error =>
        error.toString().indexOf('Error: There are no login transports') !== -1
        ? Promise.reject({ message: `${provider} is not enabled.`, status: 'PROVIDER_NOT_ENABLED' })
        : Promise.reject(error)
      )
    },

    /**
     * General purpose signup function that handles all types of signups
     * @param {Object} loginData - Login data object or string for 3rd Party Signup (Twitter, Github, Google) `Required`
     * @param {Object} loginData.email - Email of new user (`Required` only for email signup).
     */
    signup: function (signupData) {
      const { email, password, provider } = signupData
      // Handle 3rd party provider signups
      if (provider) return this.authWithOAuthPopup(provider)
      if (!email) return Promise.reject({ message: 'A valid email is required to signup.', status: 'INVALID_EMAIL' })
      // Validate password
      if (!password || password.length <= 8) return Promise.reject({ message: 'A password of at least 8 characters is required to signup.', status: 'INVALID_PASSWORD' })
      return this.createUser(signupData)
        .then(() => this.emailAuth(signupData)
        .then(authData => this.createProfile(authData)))
    },

    providerSignup: function (provider) {
      return this.authWithOAuthPopup(provider)
        .then(authData => this.createProfile(authData))
    },

    createUser: userData => rootRef.createUser(userData),

    createProfile: function (authData) {
      const { uid, provider, email, username, name } = authData
      const usersRef = rootRef.child(listNames.users)
      const userRef = usersRef.child(uid)
      let userObj = { role: 10, provider, email, username, name, createdAt: Firebase.ServerValue.TIMESTAMP }
      // Check if account with given email already exists
      return usersRef.orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(userQuery =>
          !userQuery.val()
            ? userRef.once('value').then(userSnap =>
              userSnap.val()
                ? userRef.setWithPriority(userObj, email).then(() => userObj)
                : Promise.reject({ message: 'Account already exists' }))
            : Promise.reject({ message: 'This email has already been used to create an account', status: 'EXISTS' }))
    },

    /** Start presence management for a specificed user uid. This function is used within Fireadmin login functions.
     * @param {String} uid Unique Id for user that for which presence is being setup.
     */
    setupPresence: uid => {
      let amOnline = rootRef.child('.info/connected')
      let onlineRef = rootRef.child(listNames.presence).child(uid)
      let sessionsRef = rootRef.child(listNames.sessions)
      // let userSessionRef = rootRef.child('users').child(uid).child('sessions')
      return amOnline.on('value', snapShot => {
        if (!snapShot.val()) return
        let session = sessionsRef.push({ began: Firebase.ServerValue.TIMESTAMP, user: uid }) // add session
        session.setPriority(uid)
        let endedRef = session.child('ended')
        endedRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP) // set disconnect
        onlineRef.set(true)
        onlineRef.onDisconnect().remove() // remove from presence list
        rootRef.onAuth(authData => { // Do same on unAuth
          if (!authData) {
            endedRef.set(Firebase.ServerValue.TIMESTAMP)
            onlineRef.remove()
          }
        })
      })
    }
    // usernameSignup: signupData => {
    //   // [TODO] User signup with with custom auth token with username as uid
    //   // Username signup
    //   // request a signup with username as uid
    //   return apiRequest('signup', signupData, (res) => {
    //     return rootRef.authWithCustomToken(res.token).then(authData => {
    //       return this.createProfile(authData, this.rootRef, (userAccount) => {
    //         return userAccount
    //       }, error => {
    //         //Error creating profile
    //         return Promise.reject(error)
    //       })
    //     })
    //   }, error => {
    //     return Promise.reject(error)
    //   })
    // },
  }

  return Object.assign(
    {},
    methods
  )
}
