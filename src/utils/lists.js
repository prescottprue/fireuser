import authUtil from './auth'
/** Gets list of objects created by the currently logged in User.
 * @param {String|Array} listPath -  The name or path of the list the objects will be grabbed from. `Required`
 * @param {String} Uid - The Uid of the user that created objects. `Required`
 * @return {Promise}
 */
export default ref => {
  const methods = {
    get auth () {
      return authUtil(ref)
    },

    listByCurrentUser: listName => {
      if (!listName) return Promise.reject({ message: 'Listname is required' })
      if (!this.auth.isAuthorized) return Promise.reject({ message: 'Authentication is required' })
      return ref.child(listName)
        .orderByChild('author')
        .equalTo(this.auth.uid)
        .once('value')
        .then(snap => snap.val())
    }
  }
  return Object.assign(
    {},
    methods
  )
}
