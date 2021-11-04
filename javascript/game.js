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
  music: undefined,
  leftEnemy: [],
  middleEnemy: [],
  rightEnemy: [],
  allEnemies: [],
  score: 0,
  playerHP: 5,
  playerHpArray: ['a;','a;','a;', 'a;','a;'],          // crear una clase playerHpArray y añadirle de atributo un imageName como en el background.
  keys: {
    player: {
      Q: "q", // KeyQ
      W: "w", // KeyW
      E: "e", //KeyE
    },
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
    
     sounds.music.preload = "auto";
     sounds.music.load();
     sounds.music.play();
     sounds.music.volume = 0.6;

    this.intervalId = setInterval(() => {
      this.framesCounter++;

      this.randomPlacement();

      this.drawAll();

      if (this.playerHP === 0) {
        this.gameOver();
        console.log("you lose, sucka");
      }

      if (this.score === 300) {
        this.winGame();
        console.log("a winner is you");
      }

      this.clearEnemies()

      this.scoreWall()
      this.lifeWall()
    
  
    }, 1000 / this.frames)
  },

  scoreWall() {
      this.ctx.fillStyle = 'white'
      this.ctx.font = "100px border 1px solid white"
      this.ctx.fillText('Score: ' + this.score, 40, 100)
  },


  lifeWall() {
    this.ctx.fillStyle = 'white'
    this.ctx.font = "40px Star Jedi"
    this.ctx.fillText('Lives: ' + this.playerHpArray, 500, 650)
},
  
  pickRandomEnemy() {
    const randomEnemyIndex = Math.floor(Math.random() * this.allEnemies.length);
    let randomEnemy = this.allEnemies[randomEnemyIndex];
    return randomEnemy
  },

  scoreSpeedIncreaser() {
    if (this.score >= 25) {
      return spawnSpeedIncrease = 75;
    }
    if (this.score >= 50) {
      return spawnSpeedIncrease = 50;
    }
    if (this.score >= 100) {
      return spawnSpeedIncrease = 25;
    }
    if (this.score >= 150) {
      return spawnSpeedIncrease = 10;
    }
  },

  randomPlacement() {

    if (this.framesCounter % 60 === 0) {
      this.seconds++;
    }

    const enemy = this.pickRandomEnemy() 

    if (this.seconds && this.seconds % 2 === 0  || Math.floor(Math.random() * this.scoreSpeedIncreaser()) == 0) {
      this.seconds = 0;
      const randomNumber = Math.floor(Math.random() * 3)
      
      this.createEnemy(randomNumber, enemy)
    }
  },

  createEnemy(randomNumber, enemy) {

    if (randomNumber === 0 && this.leftEnemy.length === 0){
      this.leftEnemy.push(new Character(...enemy));

    } else if (randomNumber === 1 && this.middleEnemy.length === 0) {
      this.middleEnemy.push(new Character(...enemy));

    } else if (randomNumber === 2 && this.rightEnemy.length === 0) {
      this.rightEnemy.push(new Character(...enemy));
    }
    
  },

  setGameVariables() {
    this.leftDoor = new Position(90, 340);
    this.middleDoor = new Position(570, 340);
    this.rightDoor = new Position(1050, 340);
    this.allEnemies = [
      ['trooper1.png', 220, 150, 5, 1, 2000, 1], 
      ['darktrooper1.png', 220, 150, 10, 3, 3000, 1],
      // ['ar2di2.png', 220, 150, -25, 1, 2000, 0]  
    ];
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

  killEnemies(key) {
    
    if (key === 'Q' && this.leftEnemy.length > 0) {
      this.score += this.leftEnemy[0].points;
      this.leftEnemy.splice(0,1);
      console.log(this.score);
    } 
    else if (key === 'Q' && this.leftEnemy.length === 0){
      this.playerHP--
      this.playerHpArray.splice(0,1);
      console.log(this.playerHP)
    }
    else if (key === 'W' && this.middleEnemy.length > 0) {
      this.score += this.middleEnemy[0].points;
      this.middleEnemy.splice(0,1);
      console.log(this.score);
    } 
    else if (key === 'W' && this.middleEnemy.length === 0){
      this.playerHP--
      this.playerHpArray.splice(0,1);
      console.log(this.playerHP)
    
    }else if (key === "E" && this.rightEnemy.length > 0) {
      this.score += this.rightEnemy[0].points;
      this.rightEnemy.splice(0,1);
      console.log(this.score);
    }
    else if (key === 'E' && this.rightEnemy.length === 0){
      this.playerHP--
      this.playerHpArray.splice(0,1);
      console.log(this.playerHP)
    } 

  },

  clearEnemies() {

    this.leftEnemy.filter((enemy, index) => {
      if (enemy.toDelete) {
        this.playerHP -= this.leftEnemy[0].dmg;
        this.leftEnemy.splice(index, 1);
        this.playerHpArray.splice(0,1);
        sounds.enemyBlaster.play();
      } else {
        return enemy
      }
    })

    this.middleEnemy.filter((enemy, index) => {
      if (enemy.toDelete) {
        this.playerHP -= this.middleEnemy[0].dmg;
        this.middleEnemy.splice(index, 1);
        this.playerHpArray.splice(0,1);
        sounds.enemyBlaster.play();
      } else {
        return enemy
      }
    })

    this.rightEnemy.filter((enemy, index) => {
      if (enemy.toDelete) {
        this.playerHP -= this.rightEnemy[0].dmg;
        this.rightEnemy.splice(index, 1);
        this.playerHpArray.splice(0,1);
        sounds.enemyBlaster.play();
        
      } else {
        return enemy
      }
    })

  },

  createAll() {
    this.createBackground();  
  },

  gameOver() {
    clearInterval(this.intervalId);
    sounds.music.pause();
    sounds.music.currentTime = 0;
  },

  winGame() {
    clearInterval(this.intervalId);
  },

  setListeners () {

    document.onkeyup = (e) => {

      if (e.key === this.keys.player.Q) {
        this.killEnemies('Q');
        sounds.playerBlaster.play();
        console.log("hola Q");
      }
      if (e.key === this.keys.player.W) {
        this.killEnemies('W');
        sounds.playerBlaster.play();
        console.log("hola W");
      }
      if (e.key === this.keys.player.E) {
        this.killEnemies('E');
        sounds.playerBlaster.play();
        console.log("hola E");
      }
    }

  }

};
