import game from './functional-app/game'

window.addEventListener('DOMContentLoaded', (_event) => {
  const gameDom = document.querySelector('.game')
  game(gameDom)
})
