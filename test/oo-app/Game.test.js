import assert from 'assert'
import jsdom from 'jsdom'

import Game from '../../src/oo-app/Game'
const { JSDOM } = jsdom

describe('OO - Game', () => {
  it.skip('does something good', () => {
    const dom = new JSDOM('<div class="board"></div>')
    new Game(dom).run()

    assert(false)
  })
})
