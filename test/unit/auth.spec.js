/* global describe it expect */
import authUtil from '../../src/utils/auth'
import Firebase from 'firebase'

const testFbUrl = 'https://test.firebaseio.com'
let ref = new Firebase(testFbUrl)
let auth = authUtil(ref)

describe('Auth util', () => {
  it('exists', () => {
    expect(auth).to.exist
  })

  describe('getCurrentUser method', () => {
    it('exists', () => {
      expect(auth).to.respondTo('getCurrentUser')
    })
    it('returns null when not authed', () => {
      return auth.getCurrentUser({}).should.be.rejected
    })
  })
  describe('logout method', () => {
    it('exists', () => {
      expect(auth).to.respondTo('logout')
    })
    it('logs out', () => {
      auth.logout()
      expect(ref.getAuth()).to.equal(null)
    })
  })
  describe('emailAuth method', () => {
    it('exists', () => {
      expect(auth).to.respondTo('emailAuth')
    })
    it('throws if email is not provided', () => {
      return auth.emailAuth({}).should.be.rejectedWith(Object)
    })
  })
  describe('signup method', () => {
    it('exists', () => {
      expect(auth).to.respondTo('signup')
    })
    it('throws if email is not provided', () => {
      return auth.signup({}).should.be.rejectedWith({ message: 'A valid email is required to signup.', status: 'INVALID_EMAIL' })
    })
  })
  describe('authWithOAuthPopup method', () => {
    it('exists', () => {
      expect(auth).to.respondTo('authWithOAuthPopup')
    })
    it('throws if provider is not provided', () => {
      return auth.authWithOAuthPopup().should.be.rejectedWith(Object)
    })
  })
})
