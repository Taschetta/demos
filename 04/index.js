
const tileCount = 20

let actRandomSeed = 0
let actStrokeCap;


function setup() {
  createCanvas(windowWidth, windowHeight);
  actStrokeCap = ROUND
}


function draw() {
  clear()
  strokeCap(actStrokeCap)

  randomSeed(actRandomSeed)

  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      
      // get the x and y position on the grid
      // by dividing the canva's width by the tile count 
      // and multiplying by the position
      const posX = width / tileCount * gridX      
      const posY = width / tileCount * gridY
      
      const toggle = int(random(0, 16))

      const posX_ini = posX
      const posX_end = posX + height / tileCount
      const posY_ini = posY
      const posY_end = posY + width / tileCount
      
      // strokeWeight(int(random(0, 10)))
      
      // line(posX_ini, posY_ini, posX_ini, posY_end)
      // line(posX_ini, posY_end, posX_end, posY_end)

      if(toggle === 0) {
        strokeWeight(mouseX / 20)
        line(posX_ini, posY_ini, posX_ini, posY_ini)
      }
      if(toggle === 1) {
        strokeWeight(mouseY / 20)
        line(posX_end, posY_end, posX_end, posY_end)
      }
      if(toggle === 2) {
        strokeWeight(mouseY / 20)
        circle(posX_ini, posY_ini, mouseX / 20)
        // line(posX_ini, posY_ini, posX_ini, posY_ini)
      }
      if(toggle === 3) {
        strokeWeight(mouseY / 20)
        line(posX_end, posY_end, posX_end, posY_end)
      }
    }    
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == 's1') actStrokeCap = ROUND;
  if (key == '2') actStrokeCap = SQUARE;
  if (key == '3') actStrokeCap = PROJECT;
}
