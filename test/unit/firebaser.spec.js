/* global describe expect it */
import firebaser from '../../src/utils/firebaser'

describe('firebaser util', () => {
  describe('constructor', () => {
    it('exports specific types', () =>
      firebaser('some/url', ['path'], ['get']).should.respondTo('get')
    )
    it('throws for invalid methods', () =>
      expect(firebaser.bind(firebaser, 'some/url', ['path'], ['asdf'])).to.throw('asdf is not a valid method of firebaser')
    )
  })
})
