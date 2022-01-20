
let amount = 0

let circle_count = 2

let position_X
let position_y

function setup() {
  createCanvas(windowWidth, windowHeight)

  position_X = width / 2
  position_y = height / 2
  
  background(0)
  stroke(255)
  noFill()
}


function draw() {
  amount++
  
  rotate(PI / amount)

  
  if(circle_count > 0) circle(position_X + amount, position_y + amount, 5)
  if(circle_count > 1) circle(position_X + amount, position_y - amount, 5)
  if(circle_count > 2) circle(position_X - amount, position_y + amount, 5)
  if(circle_count > 3) circle(position_X - amount, position_y - amount, 5)
}

function restart() {
  clear()
  setup()
  amount = 0
}

function mouseClicked() {
  restart()
}

function keyReleased() {
  if(key === 'r') restart() 
  if(key === '1') { restart(); circle_count = 1 }
  if(key === '2') { restart(); circle_count = 2 }
  if(key === '3') { restart(); circle_count = 3 }
  if(key === '4') { restart(); circle_count = 4 }
}