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
  playerHpArray: ['$','$','$','$','$'],          // crear una clase playerHpArray y añadirle de atributo un imageName como en el background.
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

      if (this.score >= 350) {
        this.winGame();
        console.log("a winner is you");
      }

      this.clearAllEnemies()
      this.scoreWall()
      this.lifeWall()
    
  
    }, 1000 / this.frames)
  },

  scoreWall() {
      this.ctx.fillStyle = 'white';
      this.ctx.font = "100px border 1px solid white";
      this.ctx.fillText('Score: ' + this.score, 40, 100);
  },


  lifeWall() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = "40px Star Jedi";
    this.ctx.fillText('Lives: ' + this.playerHpArray, 440, 700);
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
    if (this.score >= 250) {
      return spawnSpeedIncrease = 5;
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
      ['darktrooper1.png', 230, 150, 10, 3, 1500, 1],
      ['ar2di2.png', 220, 150, -25, 1, 2000, 0],
      ['jawa.png', 220, 150, 20, 1, 1000, 0],
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

  killEnemies(arr) {
    
    if (arr.length > 0) {
      this.score += arr[0].points;
      arr.splice(0,1);
      console.log(this.score);
    } 
    else if (arr.length === 0){
      this.playerHP--
      this.playerHpArray.splice(0,1);
      console.log(this.playerHP)
    }

  },

  clearEnemies(arr) {
    arr.filter((enemy, index) => {
      if (enemy.toDelete) {
        this.playerHP -= arr[0].dmg;
        if (arr[0].dmg !==0){
          this.playerHpArray.splice(0,1);
          sounds.enemyBlaster.play();  
        } else{
          sounds.r2d2.play();
        }
        arr.splice(index, 1);
      } else {
        return enemy
      }
    })
  },

  clearAllEnemies() {
    this.clearEnemies(this.leftEnemy)
    this.clearEnemies(this.middleEnemy)
    this.clearEnemies(this.rightEnemy)
  },

  createAll() {
    this.createBackground();  
  },

  gameOver() {
    clearInterval(this.intervalId);
    sounds.music.pause();
    sounds.music.currentTime = 0;
    GameOverSplash();
  },

  winGame() {
    clearInterval(this.intervalId);
    sounds.music.pause();
    sounds.music.currentTime = 0;
    victorySplash();
  },

  setListeners () {

    document.onkeyup = (e) => {

      if (e.key === this.keys.player.Q) {
        this.killEnemies(this.leftEnemy);
        sounds.playerBlaster.play();
      }
      if (e.key === this.keys.player.W) {
        this.killEnemies(this.middleEnemy);
        sounds.playerBlaster.play();
      }
      if (e.key === this.keys.player.E) {
        this.killEnemies(this.rightEnemy);
        sounds.playerBlaster.play();
      }
    }

  }

};
