const list = document.getElementById('midi-list')
const debug = document.getElementById('debug')

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
  }
}

function showInputs(inputs) {
  while(list.firstChild) {
    list.removeChild(list.firstChild)
  }

  const elements = inputs.map(input => {
    const el = document.createElement('li')
    el.innerText = `${input.name} (${input.manufacturer})`;
    el.addEventListener('click', connectInput.bind(null, input))
    return el;
  })

  elements.forEach(e => list.appendChild(e))
}

function handleError(error) {
  alert(error)
}

connectMIDI().catch(handleError)