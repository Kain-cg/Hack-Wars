class Character {
    constructor (ctx, posX, posY, width, height, imageName, points) {

    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.points = points;
    this.imageName = imageName;

    this.init();
/*     this.fillStyle = fillStyle;
 */
    // this.hp = hp;
    // this.enemyType = enemyType;
    // this.existTime = existTime;
    // this.state = state;

    // this.imageName = imageName;
}

/* draw() {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  } */


init() {
  this.imageInstance = new Image()
  this.imageInstance.src = `img/${this.imageName}`
}

draw() {
  this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
}


}

// var randomCreate = Math.floor(Math.random() * 10);

// const stormtrooper = new Character(this.ctx, 200, 200, 290, 460, 5, "trooper1.png");

// const jawa = new Character(1, "jawa", 5, "alive");

// const bobaFett = new Character(10, "bobaFett", 5, "alive");

// console.log(bobaFett);
// console.log(stormtrooper);
// console.log(jawa);