
// Utilities

function grid({ x: cells_x, y: cells_y, width, height, draw }) {
  for (let y = 0; y < cells_y; y++) {
    for (let x = 0; x < cells_x; x++) {

      const length_x = width / cells_x
      const length_y = height / cells_y
      
      const start_x = length_x * x
      const start_y = length_y * y

      const center_x = start_x + length_x / 2
      const center_y = start_y + length_y / 2

      draw({ 
        x, x_length: length_x, x_center: center_x, x_ini: start_x,
        y, y_length: length_y, y_center: center_y, y_ini: start_y,
      })
    }
  }
}

function pickRandom(options = []) {
  const index = int(random(0, options.length))
  options[index]()
}

// Sketch

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1000)
  noFill()
}

let seed = 0

let cells_x = 10
let cells_y = 10

let translate_x = 0
let translate_y = 0
let translate_q = 0

let keep_drawing = true

function draw() {
  if(keep_drawing) {
    // clear()
    translate_x += random(-4, 4)
    translate_y += random(-4, 4)
    translate_q += random(-4, 4)
    translate(translate_x, translate_y)
    // rotate(translate_q)
    grid({
      x: 10, 
      y: 10,
      width, 
      height,
      draw({ x, y, x_center, y_center }) {
        strokeWeight(1)
        line(
          x_center, y_center, 
          random(x_center, x_center + random(-5, 5)),
          random(y_center, y_center + random(-5, 5))
        )
      },
    })
  }
}

function mousePressed() {
  keep_drawing = !keep_drawing
}

function keyReleased() {
  if(key === 'r') { seed = random(100000); }
  if(key === 's') { save('sketch.jpg') }
  if(key === 'c') { clear() }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}