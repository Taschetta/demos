
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log({
    width,
    windowWidth,
  })
}

function draw() {
  if(mouseIsPressed) {
    background(255)
  }
  
  
    // move the coordinate system to the center of the page
    translate(width / 2, height / 2)
  
    // converts mousY from a number between 0 and height
    // to a number between 2 and 80
    const circleResolution = map(mouseY, 0, height, 2, 80);
  
    // remove half of the display's width from mouseX
    // this makes the radius smaller the more the mouse is moved toward the center
    // 0.5 is added to ensure at least a diameter of 1
    const radius = mouseX - width / 2 + 0.5
  
    // TWO_PI = full circle
    // divided by the number of lines
    const angle = TWO_PI / circleResolution
  
    strokeWeight(mouseY / 20)
  
    noFill()
    beginShape()
  
    for (let i = 0; i < circleResolution; i++) {
      const x = cos(angle * i) * radius
      const y = sin(angle * i) * radius
      
      line(0, 0, x, y)
  
      // connect the endpoints of the line
      // vertex(x, y)
    }
    endShape(CLOSE)
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}