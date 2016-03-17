/** Get account for a user given their uid.
 * @param {String} uid Unique Id for account.
 *
 */
export default ref => {
  const methods = {
    accountByUid (uid) {
      return ref.child(uid)
        .once('value')
        .then(snap => snap.val())
    },

    /** Get user account that is associated to a given email.
     * @param {String} email - Email of account to retreive.
     */
    accountByEmail (email) {
      if (!email) return Promise.reject({ message: 'Email is required to get account.' })
      return ref.child('users')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(snap => snap.val())
    },

    /** Gets list of objects created by the currently logged in User.
     * @param {String | Array} listPath -  The name or path of the list the objects will be grabbed from. `Required`
     * @param {String} Uid - The Uid of the user that created objects. `Required`
     * @return {Promise}
     */

    objectsListByUid (listPath, uid) {
      return ref(listPath).orderByChild('author')
        .equalTo(uid)
        .once('value')
        .then(snap => snap.val())
    },

    /** Get total user count
     * @return {Promise}
     */
    count () {
      return ref.child('users')
        .once('value')
        .then(usersListSnap => usersListSnap.numChildren())
    },

    /** Get the number of users that are currently online.
     * @return {Promise}
     */
    onlineCount () {
      return ref.child('presence')
        .once('value')
        .then(snap => snap.numChildren())
    }
  }
  return Object.assign(
    {},
    methods
  )
}
