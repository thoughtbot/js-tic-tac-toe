import assert from 'assert'

import gameRunner from '../../src/async-app/gameRunner'

describe('Async - game', () => {
  it.skip('does something good', (done) => {
    const assertions = () => {
      assert(false)
      done()
    }

    gameRunner(process.stdout, process.stdin, assertions)
  })
})
