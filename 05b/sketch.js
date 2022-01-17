

let seed = 0

let draw_toggle = true
let draw_once = false

let chance = 2
let chance_min = 2
let chance_max = 4

let weight = 5
let weight_min = 2
let weight_max = 5

let cells = 10
let cells_min = 4
let cells_max = 10

let actions = ['close', 'continue']
let action = 'close'

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(ROUND)
  strokeJoin(ROUND)
}

function draw() {
  if(draw_toggle || draw_once) {
    clear()
    randomSeed(seed)
  
    cells = int(map(mouseY, 0, width, cells_min, cells_max))
    weight = map(mouseY, 0 , height, weight_max, weight_min)
    chance = int(map(mouseX, 0, height, chance_min, chance_max))
    
    for (let y = 0; y < cells; y++) {
      
      for (let x = 0; x < cells; x++) {
  
        if(action === 'close') {
          endShape(CLOSE)
          beginShape()
        }
  
        const x_length = width / cells
        const y_length = height / cells
        
        const x_ini = x_length * x
        const y_ini = y_length * y
  
        const x_center = x_ini + x_length / 2
        const y_center = y_ini + y_length / 2
        
        action = actions[int(random(0, chance))]
  
        if(action === 'close' || action === 'continue') {
          const color = int(random(0,2))
          if(color === 0) {
            fill(0)
          } else {
            fill(255)
          }
          
          strokeWeight(weight)
          line(x_center, y_center, x_center, y_center)
          vertex(x_center, y_center)
          
        } else {
          // endShape(CLOSE)
        }
        
      }
    }  
  }
  if(draw_once) {
    draw_once = false
  }
}

function keyPressed() {
  if(key === 'r') {
    seed = random(100000);
    draw_once = true
  }
}

function mousePressed() {
  draw_toggle = !draw_toggle
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}