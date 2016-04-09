import Firebase from 'firebase'
import { typeReducer } from './index'

export const createFirebaseUrl = (url, relativePath) => _ =>
  [url]
      .concat(
        relativePath.map(loc =>
          loc.replace(/[.]/g, ':')
          .replace(/[#$\[\]]/g, '_-_')
        )
      )
      .join('/')

export const createFirebaseRef = (url, relativePath) => _ =>
  new Firebase(createFirebaseUrl(url, relativePath)())

export const get = (url, relativePath) => _ =>
  createFirebaseRef(url, relativePath)()
    .once('value')
    .then(data => data.val())

export const set = (url, relativePath) => object =>
  createFirebaseRef(url, relativePath)()
    .set(object)
    .then(data => data ? data.val() : object)

export const update = (url, relativePath) => object =>
  createFirebaseRef(url, relativePath)()
    .update(object)
    .then(data => data.val())

export const remove = (url, relativePath) => _ =>
  createFirebaseRef(url, relativePath)()
    .remove()
    .then(data => null)

export const sync = (url, relativePath) => callback =>
  createFirebaseRef(url, relativePath)()
    .on('value', data => callback(data.val()))

export const count = (url, relativePath) => () =>
  createFirebaseRef(relativePath)()
    .once('value')
    .then(listSnap => listSnap.numChildren())

export const getChild = (url, relativePath) => child =>
  createFirebaseRef(url, relativePath)()
    .child(child)
    .once('value')
    .then(data => data.val())

// remove https:// from beginging and .firebaseio.com from the end
export const nameFromUrl = url =>
  url.match(/^(?:https?|ftp)?:\/\/([A-Za-z0-9\-]{0,61}[A-Za-z0-9])?/)[1]

export const search = (url, relativePath) => (key, val) => {
  if (!val || val.length < 1) return Promise.resolve([])
  return createFirebaseRef(url, relativePath)()
    .orderByChild(key)
    .equalTo(val)
    .once('value')
    .then(snap => snap.val())
}

export default (url, relativePath, types) => {
  let methods = {
    get,
    getChild,
    set,
    sync,
    update,
    remove,
    count,
    search,
    nameFromUrl,
    createFirebaseUrl,
    createFirebaseRef
  }
  return typeReducer(url, relativePath, types, methods, 'firebaser')
}
