// get the ul element
const list = document.getElementById('midi-list')

// load the inputs from the MIDI access object
async function load() {
  // check browser support for requestMIDIAccess
  if(!navigator.requestMIDIAccess) {
    throw  new Error('El navegador que estas usando no puede manejar MIDI. Proba con otro navegador (Chrome, Edge, Opera)')
  }
  
  const access = await navigator.requestMIDIAccess()

  // log the access object
  console.log('access', access)
      
  // create an array from the access input values
  show(Array.from(access.inputs.values()))

  // if the access's state changes
  // reload the list
  access.onstatechange = (e) => {
    try {
      removeErrors()
      show(Array.from(e.currentTarget.inputs.values()))      
    } catch (error) {
      handle(error)
    }
  }    
}

// recibes an input list
function show(inputs) {
  // remove childs from "midi-list"
  while(list.firstChild) {
    list.removeChild(list.firstChild)
  }

  if(!inputs.length) {
    throw new Error('No tenes ningun dispositivo conectado. Por favor, conecta el dispositivo y, si el error continúa, recargá la página')
  }

  // for each item on the midi list
  // logs it and returns a li element 
  // with its name and manufacturer
  const elements = inputs.map(e => {
    const el = document.createElement('li')
    el.innerText = `${e.name} (${e.manufacturer})`
    return el
  })

  // then, it adds each element to the list
  elements.forEach(e => {
    list.appendChild(e)
  })

}

// display the error
function handle(error) {
  removeErrors()
  
  const element = document.createElement('p')

  element.className = 'error-message'
  element.innerText = error.message
  
  document.body.appendChild(element)
}

function removeErrors() {
  const errors = document.querySelectorAll('.error-message')
  for (const error of errors) {
    error.remove()
  }
}

load()
  .catch(handle)