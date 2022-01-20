
let direction_x = 1
let direction_y = 1

let amount_x = 0
let amount_y = 0

let circle_count = 2
let circle_radius = 50
let circle_position_X
let circle_position_y

function setup() {
  createCanvas(windowWidth, windowHeight)

  circle_position_X = width / 2
  circle_position_y = height / 2
  
  background(0)
  stroke(255, 50)
  angleMode(DEGREES)
  noFill()
}

let rotation = 0

function draw() {
  const velocity_x = 25
  const velocity_y = 25

  amount_x = amount_x + velocity_x * direction_x
  amount_y = amount_y + velocity_y * direction_y

  rotate(rotation)
  
  if(amount_x > width / 2 - circle_radius) {
    direction_x = -1
  }
  if(amount_x < (width / 2 - circle_radius) * -1) {
    direction_x = 1
  }

  if(amount_y > height / 2 - circle_radius) {
    direction_y = -1
  }
  if(amount_y < (height / 2 - circle_radius) * -1) {
    direction_y = 1
  }
  
  circle(
    circle_position_X + amount_x,
    circle_position_y + amount_y,
    circle_radius
  )
}

function restart() {
  background(0)
  amount = 0
}

function mouseClicked() {
  restart()
}

function keyReleased() {
  if(key === 'r') restart() 
}