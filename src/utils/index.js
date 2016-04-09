import _firebaser from './firebaser'

export const firebaser = _firebaser

export const typeReducer = (url, relativePath, types, methods, name) => {
  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      if (typeof methods[type] === 'undefined') {
        throw Error(`${type} is not a valid ${name ? 'method of ' + name : 'method'}`)
      }
      method[type] = methods[type].call(this, url, relativePath)
      return Object.assign({}, returnedMethods, method)
    }, {})
}

export default Object.assign(
  {},
  { firebaser, typeReducer }
)
