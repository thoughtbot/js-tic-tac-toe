import Game from './oo-app/Game'

window.addEventListener('DOMContentLoaded', (_event) => {
  const gameDom = document.querySelector('.game')
  new Game(gameDom).run()
})
