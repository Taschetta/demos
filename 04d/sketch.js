
let seed = 0
let change = true
let cells_x = 40
let cells_y = 40
let cells_min = 4
let cells_max = 20

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  randomSeed(seed)
  if(change) {
    clear()
  
    cells_x = map(mouseX, 0, width, cells_min, cells_max)
    cells_y = map(mouseX, 0, width, cells_min, cells_max)
    
    for (let y = 0; y < cells_y; y++) {
      for (let x = 0; x < cells_x; x++) {
  
        const x_length = width / cells_x
        const y_length = height / cells_y
        
        const x_ini = x_length * x
        const y_ini = y_length * y
  
        const x_center = x_ini + x_length / 2
        const y_center = y_ini + y_length / 2
        
        const circle_radius = map(mouseY, 0, height, 5, x_length * 1.5)

        const color = int(random(0, 2))
        
        if(color === 0) {
          fill(0)
        } else {
          fill(255)
        }

        circle(x_center, y_center, circle_radius)
      }
      
    }
  }
}

function mousePressed() {
  seed = random(100000);
}

function doubleClicked() {
  change = !change
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}