const game = document.getElementById('game')
const scoreEl = document.getElementById('score')
const gameOverEl = document.getElementById('gameOver')

let balls = []
let speed = 2
let score = 0
let gameOver = false

function createBall() {
  if (gameOver) return

  const ball = document.createElement('div')
  ball.classList.add('ball')

  const x = Math.random() * (window.innerWidth - 40)

  const obj = {
    el: ball,
    x: x,
    y: 0,
  }

  ball.style.left = obj.x + 'px'
  ball.style.top = obj.y + 'px'

  const audio = new Audio('/sound/click.mp3')

  ball.addEventListener('click', () => {
    audio.play()
    game.removeChild(ball)
    balls = balls.filter(b => b.el !== ball)

    score++
    speed += 0.2
    scoreEl.textContent = score
  })

  balls.push(obj)
  game.appendChild(ball)
}

function update() {
  if (gameOver) return

  for (let i = 0; i < balls.length; i++) {
    const b = balls[i]
    b.y += speed
    b.el.style.top = b.y + 'px'

    if (b.y > window.innerHeight - 40) {
      endGame()
      return
    }
  }
}

function endGame() {
  gameOver = true
  gameOverEl.style.display = 'block'
  setTimeout(() => {
    gameOverEl.style.opacity = '1'
  }, 10)
}

setInterval(createBall, 800)

setInterval(update, 16)
