const game = {
  title: 'Mario',
  author: 'Teo',
  license: undefined,
  version: '1.0.0',
  desciption: 'Mario Bros sin Copyright',
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: undefined, height: undefined },
  framesCounter: 0,
  frames: 60,
  intervalId: undefined,
  background: undefined,
  player: undefined,
  scoreBoard: undefined,
  obstacles: [],
  keys: {
    player: {
      SPACE: " ",
      ARROW_UP: "ArrowUp"
    }
  },

  init() {
    this.setContext()
    this.setDimensions()
    this.createAll()
    this.setListeners()

    this.start()
  },

  setContext() {
    this.canvasDOM = document.querySelector("#myCanvas")
    this.ctx = this.canvasDOM.getContext("2d")
  },

  setDimensions() {
    this.canvasSize.width = window.innerWidth
    this.canvasSize.height = window.innerHeight

    this.canvasDOM.setAttribute("width", this.canvasSize.width)
    this.canvasDOM.setAttribute("height", this.canvasSize.height)
  },


  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++

      if (this.framesCounter > 2000) {
        this.framesCounter = 0
      }
      if (this.framesCounter % 100 === 0) {
        this.createObstacle()
      }

      this.clearScreen()
      this.drawAll()
      this.moveAll()
      this.clearObstacles()

      if (this.isCollisionPlayer()) {
        this.gameOver()
      }

    }, 1000 / this.frames)
  },

  drawAll() {
    this.drawBackground()
    this.drawPlayer()
    this.drawObstacles()
    this.drawBullets()
    this.drawScoreBoard()
  },

  drawBackground() {
    this.background.draw()
  },

  drawPlayer() {
    this.player.draw(this.framesCounter)
  },

  drawObstacles() {
    this.obstacles.forEach(obs => obs.draw())
  },

  drawBullets() {
    this.player.bullets.forEach(bullet => bullet.draw())
  },

  drawScoreBoard() {
    this.scoreBoard.draw(this.framesCounter)
  },

  moveAll() {
    this.moveBackground()
    this.movePlayer()
    this.moveObstacles()
  },

  moveBackground() {
    this.background.move()
  },

  movePlayer() {
    this.player.move()
  },

  moveObstacles() {
    this.obstacles.forEach(obs => obs.move())
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
  },

  createAll() {
    this.createBackground()
    this.createPlayer()
    this.createScoreBoard()
  },

  createBackground() {
    this.background = new s(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height, 5, "bg.png")
  },

  createPlayer() {
    this.player = new Player(this.ctx, 20, this.canvasSize.height - 150, 100, 140, 5, "player.png")
  },

  createObstacle() {
    this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.width, this.canvasSize.height - 80, 40, 80, 5))
  },

  createScoreBoard() {
    this.scoreBoard = new Score(this.ctx, 100, 100)
  },

  setListeners() {
    document.onkeyup = (e) => {
      if (e.key === this.keys.player.SPACE) {
        this.player.jump()
      }
      if (e.key === this.keys.player.ARROW_UP) {
        this.player.shoot()
      }
    }
  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => {
      if (obs.pos.x > 0) {
        return true
      }
    })
  },

  isCollisionPlayer() {
    return this.obstacles.some(obs => {

      return (
        this.player.pos.x + this.player.size.width > obs.pos.x && //lado drch del player lado izq del obs
        this.player.pos.x < obs.pos.x + obs.size.width &&         //lado izq del player lado drch del obs
        this.player.pos.y + this.player.size.height > obs.pos.y //lado de abajo del player lado de arriba del obs
      )

    })

  },

  gameOver() {
    clearInterval(this.intervalId)
  }
}