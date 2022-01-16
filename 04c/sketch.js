
let x_cells = 20
let x_cells_min = 4
let x_cells_max = 20

let y_cells = 10
let y_cells_min = 4
let y_cells_max = 20

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill()
}


function draw() {
  if(mouseIsPressed) {
    x_cells = map(mouseX, 0, width, x_cells_min, x_cells_max)
    y_cells = map(mouseY, 0, width, y_cells_min, y_cells_max)
    
    for (let y = 0; y < y_cells; y++) {
      for (let x = 0; x < x_cells; x++) {
  
        const x_length = width / x_cells
        const y_length = height / y_cells
        
        const x_ini = x_length * x
        const y_ini = y_length * y
  
        const x_center = x_ini + x_length / 2
        const y_center = y_ini + y_length / 2
        
        const circle_radius = max(x_length, y_length) * 2
        
        circle(x_center, y_center, circle_radius)
      }
      
    }
  }
}

function doubleClicked() {
  clear()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}