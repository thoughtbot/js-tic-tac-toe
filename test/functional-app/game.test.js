import assert from 'assert'
import jsdom from 'jsdom'

import game from '../../src/functional-app/game'
const { JSDOM } = jsdom

describe('Functional - game', () => {
  it.skip('does something good', () => {
    const dom = new JSDOM('<div class="board"></div>')
    game(dom)

    assert(false)
  })
})
