class Character {
    constructor (imageName, height, width, points, enemyHP) {

    // this.ctx = ctx;
    // this.posX = posX;
    // this.posY = posY;
    this.width = width;
    this.height = height;
    this.points = points;
    this.imageName = imageName;
    this.enemyHP = enemyHP

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

draw(ctx, pos) {
  ctx.drawImage(this.imageInstance, pos.posX, pos.posY, this.width, this.height)
}


}

const stormtrooper = new Character('trooper1.png', 150, 240, 5, 1);
const darktrooper = new Character('darktrooper1.png', 150, 240, 10, 3);
// var randomCreate = Math.floor(Math.random() * 10);

// const stormtrooper = new Character(this.ctx, 200, 200, 290, 460, 5, "trooper1.png");

// const jawa = new Character(1, "jawa", 5, "alive");

// const bobaFett = new Character(10, "bobaFett", 5, "alive");

// console.log(bobaFett);
// console.log(stormtrooper);
// console.log(jawa);