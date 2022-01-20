// // Sound 

const context = new AudioContext()

function amp_gate() {
  const time = context.currentTime + .1
  const amp_time_attack = .1
  const amp_time_release = .5

  const oscillator = context.createOscillator()
  
  oscillator.frequency.value = 440


  const amp = context.createGain()

  amp.gain.value = 0


  // start
  // amp.gain.linearRampToValueAtTime(0, time);
  // attack
  amp.gain.linearRampToValueAtTime(.5, time + amp_time_attack);
  // decay
  amp.gain.linearRampToValueAtTime(0, time + amp_time_attack + amp_time_release);
  // connections
  
  oscillator.connect(amp)
  amp.connect(context.destination)
  
  oscillator.start(time)
  oscillator.stop(time + amp_time_attack + amp_time_release)
}

// Sketch

const s = p => {
  let direction_x = 1
  let direction_y = 1
  
  let amount_x = 0
  let amount_y = 0
  
  let circle_count = 2
  let circle_radius = 50
  let circle_position_X
  let circle_position_y
  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight)
  
    circle_position_X = p.width / 2
    circle_position_y = p.height / 2
    
    p.background(0)
    p.stroke(255, 50)
    p.angleMode(p.DEGREES)
    p.noFill()
  }
  
  let rotation = 0
  
  p.draw = function() {
    const velocity_x = 25
    const velocity_y = 25
  
    amount_x = amount_x + velocity_x * direction_x
    amount_y = amount_y + velocity_y * direction_y
  
    p.rotate(rotation)
    
    if(amount_x > p.width / 2 - circle_radius) {
      direction_x = -1
      amp_gate()
    }
    if(amount_x < (p.width / 2 - circle_radius) * -1) {
      direction_x = 1
      amp_gate()
    }
  
    if(amount_y > p.height / 2 - circle_radius) {
      direction_y = -1
      amp_gate()
    }
    if(amount_y < (p.height / 2 - circle_radius) * -1) {
      direction_y = 1
      amp_gate()
    }
    
    p.circle(
      circle_position_X + amount_x,
      circle_position_y + amount_y,
      circle_radius
    )
  }
  
  function restart() {
    p.background(0)
    amount = 0
  }
  
  function mouseClicked() {
    restart()
  }
  
  function keyReleased() {
    if(key === 'r') restart() 
  }
}

new p5(s)