var randomCreate = Math.floor(Math.random() * 10);

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
  enemies2: [],
  enemies3: [],
  score: 0,
  playerHP: 3,
  randomCreate: undefined,
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
        const randomNumber = Math.floor(Math.random() * 3)
        if (randomNumber === 0 && this.enemies.length === 0){
          this.createEnemies();

        } else if (randomNumber === 1 && this.enemies2.length === 0) {
          this.createEnemies2();

        } else if (randomNumber === 2 && this.enemies3.length === 0) {
          this.createEnemies3();

        } else if (this.enemies.length > 0 || this.enemies2.length > 0) {
        this.clearEnemies();
      }

    }

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

  // random() {
  //   this.randomCreate = Math.floor(Math.random() * 10);
  //   console.log("hola random");
  // },
  
  drawAll() {
    this.drawBackground();
    this.drawEnemies();
  },

  drawBackground() {
    this.background.draw();
  },

  drawEnemies() {
    this.enemies.forEach(enem => enem.draw());
    this.enemies2.forEach(enem => enem.draw());
    this.enemies3.forEach(enem => enem.draw());

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

      this.enemies.push(new Character(this.ctx, 100, 100, 80, 80, 'green'));
       console.log("enemigo creado");
  },

  createEnemies2() {

    this.enemies2.push(new Character(this.ctx, 200, 100, 80, 80, 'red'));
      console.log("enemigo 2 creado");

  },

  createEnemies3() {

    this.enemies3.push(new Character(this.ctx, 300, 100, 80, 80, 'blue'));
      console.log("enemigo 3 creado");

  },

  killEnemies(key) {
    
    if (key === 'Q' && this.enemies.length > 0) {
      this.enemies.splice(0,1);
      this.score += 5;
      console.log(this.score);
    } else if (key === 'W' && this.enemies2.length > 0) {
      this.enemies2.splice(0,1);
      this.score += 5;
      console.log(this.score);
    } else if (key === "E" && this.enemies3.length > 0) {
      this.enemies3.splice(0,1);
      this.score += 5;
      console.log(this.score);
    } 
    // falta else if enemies3 blabla
    

    // if (this.enemies.length > 0) {
    //   this.enemies.splice(0,1);
    //   this.score += 5;
    //   console.log(this.score);
    // }

  },

  // killEnemiesW() {
    
  //   if (this.enemies2.length > 0) {
  //     this.enemies2.splice(0,1);
  //     this.score += 5;
  //     console.log(this.score);
  //   }

  // },

  clearEnemies() {

    if (this.enemies.length > 0) {
      this.enemies.splice(0,1);
      this.playerHP--;
      console.log(this.playerHP);
    } else if (this.enemies2.length > 0) {
      this.enemies2.splice(0,1);
      this.playerHP--;
      console.log(this.playerHP);
    } else if (this.enemies3.length > 0) {
      this.enemies3.splice(0,1);
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
        this.killEnemies('Q');
        console.log("hola Q");
      }
      if (e.key === this.keys.player.W) {
        this.killEnemies('W');
        console.log("hola W");
      }
      if (e.key === this.keys.player.E) {
        this.killEnemies('E');
        console.log("hola E");
      }
    }

  }

};
