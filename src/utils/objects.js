import authUtil from './auth'
import { createFirebaseRef } from './firebaser'

export default url => {
  const methods = {
    /** Gets list of objects created by the currently logged in User.
     * @param {String|Array} listPath -  The name or path of the list the objects will be grabbed from. `Required`
     * @param {String} Uid - The Uid of the user that created objects. `Required`
     * @return {Promise}
     */
    listByCurrentUser: listName => {
      if (!listName) return Promise.reject({message: 'Listname required to list objects.'})
      if (!authUtil(url).currentUser) return Promise.reject({ code: 'INVALID_AUTH', message: 'listByCurrentUser cannot load list without current user' })
      return ref.child(listName)
        .orderByChild('author')
        .equalTo(authUtil(url).currentUser.uid)
        .once('value')
        .then(snap => snap.val())
    }
  }

  return Object.assign(
    {},
    methods
  )
}
