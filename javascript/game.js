const hackWars = {
  name: "HackWars",
  description: "Shooter desarrollado durante el bootcamp de Ironhack",
  version: "1.0.0",
  author: "Andrés Molina & Alejandro López",
  license: undefined,
  repository: undefined,
  ctx: undefined,
  canvasDOM: undefined,
  canvasSize: { width: undefined, height: undefined },
  background: undefined,
  frames: 60,
  intervalId: undefined,
  framesCounter: 0,
  seconds: 0,
  enemies: [],
  score: 0,
  playerHP: 3,
  keys: {
    player: {
      Q: "q", // KeyQ
      W: "w", // KeyW
      E: "e", //KeyE
    },
  playerHP: 3,
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.createAll();
    this.setListeners();
    this.start();
    
  },

  setContext() {
    this.canvasDOM = document.querySelector("#canvas");
    this.ctx = this.canvasDOM.getContext("2d");
  },

  setDimensions() {
    this.canvasSize.width = 1280;
    this.canvasSize.height = 720;

    this.canvasDOM.setAttribute("width", this.canvasSize.width);
    this.canvasDOM.setAttribute("height", this.canvasSize.height);
  },

  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++;

      if (this.framesCounter % 60 === 0) {
        this.seconds++;
      }

      if (this.seconds && this.seconds % 2 === 0) {
        this.seconds = 0;
        if (this.enemies.length === 0) {
          this.createEnemies();

        } else if (this.enemies.length > 0) {
          this.clearEnemies()
        }
      }

      // if (this.seconds && this.seconds % 10 === 0) {
      //   this.seconds = 0;
      //   this.clearEnemies();
      // }

      this.drawAll()

      if (this.playerHP === 0) {
        this.gameOver();
        console.log("you lose, sucka")
      }

      if (this.score === 100) {
        this.winGame();
        console.log("a winner is you")
      }
  
    }, 1000 / this.frames)
  },
  
  drawAll() {
    this.drawBackground();
    this.drawEnemies();
  },

  drawBackground() {
    this.background.draw();
  },

  drawEnemies() {
    this.enemies.forEach(enem => enem.draw())
  },
 

  createBackground() {
    this.background = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.width,
      this.canvasSize.height,
      5,
      "bg.jpg"
    );
  },

  createEnemies() {

    // setTimeout(()=>{
      this.enemies.push(new Character(this.ctx, 100, 100, 80, 80));
    // }, 5000);
       console.log("enemigo creado");
    
  },

  killEnemies() {
    
    if (this.enemies.length > 0) {
      this.enemies.splice(0,1);
      this.score += 10;
      console.log(this.score);
    }

  },

  clearEnemies() {

    if (this.enemies.length > 0) {
      this.enemies.splice(0,1);
      this.playerHP--;
      console.log(this.playerHP);
    }

  },

  // loseHP() {



  // },

  createAll() {
    this.createBackground();  
  },

  gameOver() {
    clearInterval(this.intervalId);
  },

  winGame() {
    clearInterval(this.intervalId);
  },

  setListeners () {

    document.onkeyup = (e) => {

      if (e.key === this.keys.player.Q) {
        this.killEnemies();
        console.log("hola Q");
      }
      if (e.key === this.keys.player.W) {
        console.log("hola W");
      }
      if (e.key === this.keys.player.E) {
        console.log("hola E");
      }
    }

  }

};
