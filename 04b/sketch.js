
let change = true
let cells_x = 20
let cells_y = 20
let cells_min = 4
let cells_max = 20

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill()
}

function draw() {
  if(change) {
    clear()
  
    cells_x = map(mouseX, 0, width, cells_min, cells_max)
    cells_y = map(mouseY, 0, width, cells_min, cells_max)
    
    for (let y = 0; y < cells_y; y++) {
      for (let x = 0; x < cells_x; x++) {
  
        const x_length = width / cells_x
        const y_length = height / cells_y
        
        const x_ini = x_length * x
        const y_ini = y_length * y
  
        const x_center = x_ini + x_length / 2
        const y_center = y_ini + y_length / 2
        
        const circle_radius = max(x_length, y_length) * 1.5

        circle(x_center, y_center, circle_radius)
      }
      
    }
  }
}

function mousePressed() {
  change = !change
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}