var randomCreate = Math.floor(Math.random() * 10);

const stormtrooper = new Character('trooper1.png', 150, 240, 5, 1);
const darktrooper = new Character('darktrooper1.png', 150, 240, 10, 3);

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
  leftDoor: undefined,
  middleDoor: undefined,
  rightDoor: undefined,
  leftEnemy: [],
  middleEnemy: [],
  rightEnemy: [],
  allEnemies: [],
  score: 0,
  playerHP: 5,
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
    this.setGameVariables();
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

    //   if (this.framesCounter % 60 === 0) {
    //     this.seconds++;
    //   }

    //   if (this.seconds && this.seconds % 1 === 0) {
    //     this.seconds = 0;
    //     const randomNumber = Math.floor(Math.random() * 3)

    //     if (randomNumber === 0 && this.leftEnemy.length === 0){
    //       this.createEnemies();

    //     } else if (randomNumber === 1 && this.middleEnemy.length === 0) {
    //       this.createmiddleEnemy();

    //     } else if (randomNumber === 2 && this.rightEnemy.length === 0) {
    //       this.createrightEnemy();

    //     } else if (this.leftEnemy.length > 0 || this.middleEnemy.length > 0 || this.rightEnemy.length > 0) {
    //     this.clearEnemies();
    //   }

    // }

      this.randomPlacement();

      this.drawAll();

      if (this.playerHP === 0) {
        this.gameOver();
        console.log("you lose, sucka");
      }

      if (this.score === 200) {
        this.winGame();
        console.log("a winner is you");
      }
  
    }, 1000 / this.frames)
  },

  randomPlacement() {

    if (this.framesCounter % 60 === 0) {
      this.seconds++;
    }

    const pickEnemy = Math.floor(Math.random() * this.allEnemies.length);
    let enemy = this.allEnemies[pickEnemy];

    if (this.seconds && this.seconds % 2 === 0) {
      this.seconds = 0;
      const randomNumber = Math.floor(Math.random() * 3)
      
      if (randomNumber === 0 && this.leftEnemy.length === 0){
        this.leftEnemy.push(enemy);

      } else if (randomNumber === 1 && this.middleEnemy.length === 0) {
        this.middleEnemy.push(enemy);

      } else if (randomNumber === 2 && this.rightEnemy.length === 0) {
        this.rightEnemy.push(enemy);

      } else if (this.leftEnemy.length > 0 || this.middleEnemy.length > 0 || this.rightEnemy.length > 0) {
      this.clearEnemies();
    }

  }

  },

  setGameVariables() {
    this.leftDoor = new Position(90, 340);
    this.middleDoor = new Position(570, 340);
    this.rightDoor = new Position(1050, 340);
    this.allEnemies = [stormtrooper, darktrooper];
  },
  
  drawAll() {
    this.drawBackground();
    this.drawEnemies();
  },

  drawBackground() {
    this.background.draw();
  },

  drawEnemies() {
    this.leftEnemy.forEach(enem => enem.draw(this.ctx, this.leftDoor));
    this.middleEnemy.forEach(enem => enem.draw(this.ctx, this.middleDoor));
    this.rightEnemy.forEach(enem => enem.draw(this.ctx, this.rightDoor));

  },
 

  createBackground() {
    this.background = new Background(this.ctx, 0,  0,  this.canvasSize.width,  this.canvasSize.height,  5,  "background_2.png");
  },

  // createEnemies() {
  //   this.leftEnemy.push(new Character(this.ctx, 90, 360, 150, 240, 'trooper1.png'));   //100
  //   console.log("enemigo creado");
  // },

  // createmiddleEnemy() {
  //   this.middleEnemy.push(new Character(this.ctx, 570, 340, 150, 240, 'trooper1.png'));    //618
  //   console.log("enemigo 2 creado");

  // },

  // createrightEnemy() {
  //   this.rightEnemy.push(new Character(this.ctx, 1050, 340, 150, 240, 'darktrooper1.png'));     //1160
  //   console.log("enemigo 3 creado");

  // },

  killEnemies(key) {
    
    if (key === 'Q' && this.leftEnemy.length > 0) {
      this.leftEnemy.splice(0,1);
      this.score += 5;
      this.blaster1.play();
      console.log(this.score);
    } 
    else if (key === 'Q' && this.leftEnemy.length === 0){
      this.playerHP--
      console.log(this.playerHP)
    }
    else if (key === 'W' && this.middleEnemy.length > 0) {
      this.middleEnemy.splice(0,1);
      this.score += 5;
      console.log(this.score);
    } 
    else if (key === 'W' && this.middleEnemy.length === 0){
      this.playerHP--
      console.log(this.playerHP)
    
    }else if (key === "E" && this.rightEnemy.length > 0) {
      this.rightEnemy.splice(0,1);
      this.score += 5;
      console.log(this.score);
    }
    else if (key === 'E' && this.rightEnemy.length === 0){
      this.playerHP--
      console.log(this.playerHP)
    } 
    // falta else if rightEnemy blabla
    
    // if (this.leftEnemy.length > 0) {
    //   this.leftEnemy.splice(0,1);
    //   this.score += 5;
    //   console.log(this.score);
    // }

  },

  // killEnemiesW() {
    
  //   if (this.middleEnemy.length > 0) {
  //     this.middleEnemy.splice(0,1);
  //     this.score += 5;
  //     console.log(this.score);
  //   }

  // },

  clearEnemies() {

    if (this.leftEnemy.length > 0) {
      this.leftEnemy.splice(0,1);
      this.playerHP--;
      console.log(this.playerHP);
    } else if (this.middleEnemy.length > 0) {
      this.middleEnemy.splice(0,1);
      this.playerHP--;
      console.log(this.playerHP);
    } else if (this.rightEnemy.length > 0) {
      this.rightEnemy.splice(0,1);
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
