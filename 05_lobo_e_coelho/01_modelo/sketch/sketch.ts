class Entity {
  x: number = 0;
  y: number = 0;
  step: number = 100;
  image: p5.Image;

  constructor(x: number, y: number, lado: number, image: p5.Image) {
    this.x = x;
    this.y = y;
    this.step = lado;
    this.image = image;
  }

  draw() {
    image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
  }
}
class Board {
  nl: number;
  nc: number;
  step: number;
  background: p5.Image;

  constructor(nl: number, nc: number, step: number, background: p5.Image) {
    this.nl = nl;
    this.nc = nc;
    this.step = step;
    this.background = background;
  }

  draw(): void {
    image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
    for (let x = 0; x < this.nc; x++) {
      for (let y = 0; y < this.nl; y++) {
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(x * this.step, y * this.step, this.step, this.step);
      }
    }
  }
}

let wolf: Entity;
let wolf_img: p5.Image;
let wolf_right: p5.Image;

let rabbit: Entity;
let rabbit_img: p5.Image;
let rabbit_right: p5.Image;

let bg: Board;
let bg_img: p5.Image;

let contador: number;
let dir: number;
let dir_anterior: number;

let timer: number = 0;
let vx: number;
let vy: number;

function preload() {
  wolf_img = loadImage('./Sprites/lobinho.png');
  wolf_right = loadImage('./Sprites/lobinho_02.png');
  rabbit_img = loadImage('./Sprites/coelho.png');
  rabbit_right = loadImage('./Sprites/coelho_02.png')
  bg_img = loadImage('./Sprites/fundo.png')
}

//fazer o lobo andar
function keyPressed() {
  //let t: number = frameCount;
  //let a: number = 5

  if (keyCode === LEFT_ARROW) {
    wolf.image = wolf_img;
    vx = -1;
    vy = 0;
  }
  if (keyCode === RIGHT_ARROW) {
    wolf.image = wolf_right;
    vx = 1;
    vy = 0;
  }
  if (keyCode === UP_ARROW) {
    vx = 0;
    vy = -1;
  }
  if (keyCode === DOWN_ARROW) {
    vx = 0;
    vy = 1;
  }
}

function wolf_walk(){
  if (frameCount - timer > 40) {
    timer = frameCount; 
    wolf.x += vx; 
    wolf.y += vy;
  }
}

//fazer o lobo não sair da tela
function wolf_block() {
  if (wolf.x < 0) {
    wolf.x = 0;
  }
  if (wolf.y <0) {
    wolf.y = 0;
  }
  if (wolf.x > bg.nc - 1) {
    wolf.x = bg.nc - 1;
  }
  if (wolf.y > bg.nl - 1) {
    wolf.y = bg.nl - 1;
  }
}

function rabbit_loop() {
  if (rabbit.x < 0) {
    rabbit.x = bg.nc - 1;
  }
  if (rabbit.y <0) {
    rabbit.y = bg.nl - 1;
  }
  if (rabbit.x > bg.nc - 1) {
    rabbit.x = 0;
  }
  if (rabbit.y > bg.nl - 1) {
    rabbit.y = 0;
  }
}

function rabbit_walk() {
  contador = 30;
  dir = random(1,4);
  while(dir != dir_anterior) {
    if (frameCount % contador == 0) { 
      if (Math.round(dir) == 1) {
        rabbit.image = rabbit_img;
        rabbit.x--;
      }
      if (Math.round(dir) == 2) {
        rabbit.image = rabbit_right;
        rabbit.x++;
      }
      if (Math.round(dir) == 3) {
         rabbit.y--;
      }
      if (Math.round(dir) == 4) {
        rabbit.y++;
      }
    }
    dir_anterior = dir;
  }
}

function rabbit_block() {
  if (rabbit.x < 0) {
    rabbit.x++;
  }
  if (rabbit.y < 0) {
    rabbit.y++;
  }
  if (rabbit.x > bg.nc - 1) {
    rabbit.x--;
  }
  if (rabbit.y > bg.nl - 1) {
    rabbit.y--;
  }
}

//setup inicializa as funções do p5
function setup() {
  frameRate(60);
  let size = 100;
  wolf = new Entity(0,0, size, wolf_img);
  rabbit = new Entity(5, 5, size, rabbit_img);
  bg = new Board(5,5, size, bg_img);
  createCanvas(bg.nc * size, bg.nl * size);
}

//draw "desenha" a tela a cada frame
function draw() {
  bg.draw();
  wolf.draw();
  rabbit.draw();

  wolf_block();
  wolf_walk();
  //rabbit_loop();
  rabbit_walk();
  rabbit_block();
}