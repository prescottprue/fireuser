import firebaser, { getChild, createFirebaseRef, count, get } from '../utils/firebaser'
import { listNames } from '../config'

/** Get account for a user given their uid.
 * @param {String} uid Unique Id for account.
 *
 */
export default url => {
  const ref = createFirebaseRef(url, [])()

  let methods = {
    get: uid =>
      uid
      ? getChild(url, [listNames.users])(uid)
      : get(url, [listNames.users])(),

    /** Gets list of objects created by the currently logged in User.
     * @param {String | Array} listPath -  The name or path of the list the objects will be grabbed from. `Required`
     * @param {String} Uid - The Uid of the user that created objects. `Required`
     * @return {Promise}
     */

    objectsListByUid: (listPath, uid) =>
      ref(listPath)
        .orderByChild('author')
        .equalTo(uid)
        .once('value')
        .then(snap => snap.val()),

    /** Get the number of users that are currently online.
     * @return {Promise}
     */
    onlineCount: () =>
      count(url, ['presence'])
  }
  return Object.assign(
    {},
    methods,
    firebaser(url, [listNames.users], ['get', 'search', 'sync', 'count'])
  )
}
