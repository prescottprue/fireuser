import { ServerValue } from 'firebase'
import firebaser, { createFirebaseRef, set } from '../utils/firebaser'
import { listNames } from '../config'

export default (url, uid) => {
  let methods = {
    /** Gets list of objects created by the currently logged in User.
     * @param {String | Array} listPath -  The name or path of the list the objects will be grabbed from. `Required`
     * @param {String} Uid - The Uid of the user that created objects. `Required`
     * @return {Promise}
     */

    listObjects: listName =>
      createFirebaseRef(url, listName.split('/'))
        .orderByChild('author')
        .equalTo(uid)
        .once('value')
        .then(snap => snap.val()),

    createObject: (listName, data) =>
      set(url, [listNames.users, uid])(Object.assign(data, { createdAt: ServerValue.TIMESTAMP }))
  }
  return Object.assign(
    {},
    methods,
    firebaser(url, [listNames.users, uid], ['get', 'update', 'sync'])
  )
}
