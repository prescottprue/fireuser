/* global describe it expect */

import Fireadmin from '../../src'
const testFbUrl = 'http://test.firebaseio.com'
const fa = new Fireadmin(testFbUrl)

describe('Fireadmin', () => {
  it('exists', () =>
    expect(Fireadmin).to.exist
  )
  describe('Constructor', () => {
    it('sets correct app name', () =>
      expect(fa.name).to.equal('test')
    )
    it('exposes users methods', () =>
      expect(fa.users).to.be.an.object
    )
    it('exposes user methods', () =>
      expect(fa.user).to.be.an.object
    )
  })
})
