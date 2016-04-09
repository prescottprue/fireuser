import Firebase from 'firebase'
import auth from './utils/auth'
import users from './users'
import user from './user'
import { nameFromUrl } from './utils/firebaser'

export default class Fireuser {
  /** Constructor
   * @param {string} url Url of Firebase with which to use Fireuser
   */
  constructor (url, opts) {
    if (!url) throw new Error('Firebase url is required to use Fireuser')
    this.url = url
    this.name = nameFromUrl(url)
    this.rootRef = new Firebase(url)
    if (opts) this.options = opts
    this.users = users(this.url)
    Object.assign(
      this,
      auth(this.url)
    )
  }

  user (uid) {
    return user(this.url, uid)
  }

  get isAuthorized () {
    return this.rootRef.getAuth()
  }
}
