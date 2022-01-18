// MIDI SETUP

const list = document.getElementById('midi-list')
const debug = document.getElementById('debug')

const state = {
  0: { value: 0 },
  1: { value: 0 },
  2: { value: 0 },
  3: { value: 0 },
  4: { value: 0 },
  5: { value: 0 },
  6: { value: 0 },
  7: { value: 0 },
}

async function connectMIDI() {
  if(!navigator.requestMIDIAccess) {
    throw new Error('El navegador que estas usando no puede manejar MIDI. Proba con otro navegador (Chrome, Edge, Opera)')
  }

  const access = await navigator.requestMIDIAccess()

  const inputs = Array.from(access.inputs.values())

  showInputs(inputs)

  access.onstatechange = (e) => {
    const inputs = Array.from(e.currentTarget.inputs.values())
    showInputs(inputs)
  }
}

async function connectInput(input) {
  console.log('Connecting to device', input);

  input.onmidimessage = (message) => {
    const [status, data_a, data_b] = message.data;
    debug.innerText = `STATUS: ${status} | DATA_BYTE_1: ${data_a} | DATA_BYTE_2: ${data_b}`

    if(state[data_a]) {
      state[data_a].value = data_b
    }    
  }
}

function showInputs(inputs) {
  while(list.firstChild) {
    list.removeChild(list.firstChild)
  }

  const elements = inputs.map(input => {
    const el = document.createElement('li')
    el.innerText = `${input.name} (${input.manufacturer})`
    el.addEventListener('click', connectInput.bind(null, input))
    return el;
  })

  elements.forEach(e => list.appendChild(e))
}

function handleError(error) {
  alert(error)
}

connectMIDI().catch(handleError)

// P5 Sketch

let pos_x
let pos_y

let circle_radius
let circle_radius_min = 10
let circle_radius_max = 50

let fill_value

function setup() {
  const canvas = createCanvas(windowWidth - 100, 500);
  canvas.parent('canvas-section')
  background(255)
}

function draw() {

  translate(width / 2, height / 2)
  
  pos_x = map(state[0].value, 0, 127, 0, width / 2)
  pos_y = map(state[1].value, 0, 127, 0, height / 2)
  
  circle_radius = map(state[2].value, 0, 127, circle_radius_min, circle_radius_max)
  
  fill_value = map(state[3].value, 0, 127, 0, 255)

  stroke(fill_value)
  fill(fill_value)
  
  circle(-pos_x, -pos_y, circle_radius)
  circle(-pos_x, pos_y, circle_radius)
  circle(pos_x, -pos_y, circle_radius)
  circle(pos_x, pos_y, circle_radius)
}

function keyReleased() {
  if(key === 's') { save('myCanvas.jpg') }
  if(key === 'c') { clear() }
}

