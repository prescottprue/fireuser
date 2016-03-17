export default ref => {
  const methods = {
    /** Creates an object provided the name of the list the object will go into and the object it this.
     * @description The object is created with a createdAt parameter that is a server timestamp from Firebase. If a user is currently signed in, the object will contain the author's `$uid` under the author parameter.
     * @param {String} listName - The name of the list the object will be put into. `Required`
     * @param {Object} objectData - Data you wish to be contained within new object. `Required`
     * @return {Promise}
     */
    createObject: (listName, obj) => {
      const auth = ref.getAuth()
      if (auth) obj.author = auth.uid
      obj.createdAt = Date.now()
      return new Promise((resolve, reject) => {
        ref.child(listName).push(obj, error => error ? reject(error) : resolve(obj))
      })
    },

    /** Gets list of objects created by the currently logged in User.
     * @param {String|Array} listPath -  The name or path of the list the objects will be grabbed from. `Required`
     * @param {String} Uid - The Uid of the user that created objects. `Required`
     * @return {Promise}
     */
    listByCurrentUser: listName => {
      if (!listName) return Promise.reject({message: 'Listname required to list objects.'})
      if (!ref.getAuth()) return Promise.reject({ code: 'INVALID_AUTH', message: 'listByCurrentUser cannot load list without current user' })
      return ref.child(listName)
        .orderByChild('author')
        .equalTo(ref.getAuth().uid)
        .once('value')
        .then(snap => snap.val())
    }
  }

  return Object.assign(
    {},
    methods
  )
}
