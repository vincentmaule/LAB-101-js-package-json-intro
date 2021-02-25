const startButton = document.getElementById('start-button')
const bestResult = document.getElementById('best-result')
const timeResult = document.getElementById('time-result')

const TICK_INTERVAL = 1
const NUM_CLICKIES = 10
const CLICKY_SIZE = 50

let timer, time, best

function resetGame () {
  stopTimer()
  best = parseInt(window.localStorage.getItem('best'))
  if (isNaN(best)) {
    best = 0
  }
  time = 0

  const clickies = document.getElementsByClassName('clicky')
  while (clickies.length) {
    removeClicky(clickies[0])
  }
}

function randomUnit (dimension) {
  let unit = Math.floor(Math.random() * dimension + 1)
  if (unit <= CLICKY_SIZE) {
    unit += CLICKY_SIZE
  } else if (unit >= dimension - CLICKY_SIZE) {
    unit -= CLICKY_SIZE
  }
  return unit
}

function checkGameOver () {
  const clickies = document.getElementsByClassName('clicky')
  if (!clickies.length) {
    stopTimer()
    if (time > 0 && (time < best || best === 0)) {
      best = time
      window.localStorage.setItem('best', best)
    }
    updateStats()
  }
}

function clickyClick () {
  removeClicky(this)
  checkGameOver()
}

function newClicky () {
  const clicky = document.createElement('div')
  clicky.className = 'clicky'
  clicky.style.top = randomUnit(window.top.innerHeight) + 'px'
  clicky.style.left = randomUnit(window.top.innerWidth) + 'px'
  clicky.style.width = CLICKY_SIZE + 'px'
  clicky.style.height = CLICKY_SIZE + 'px'
  clicky.addEventListener('click', clickyClick)
  document.body.appendChild(clicky)
}

function removeClicky (clicky) {
  if (clicky) {
    clicky.outerHTML = ''
  }
}

function stopTimer () {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
}

function updateStats () {
  bestResult.textContent = best
  timeResult.textContent = time
}

function tick () {
  time += TICK_INTERVAL
  updateStats()
}

function newGame () {
  resetGame()
  for (let i = 0; i < NUM_CLICKIES; i++) {
    newClicky()
  }
  timer = window.setInterval(tick, TICK_INTERVAL)
}

startButton.addEventListener('click', newGame)

resetGame()
updateStats()
