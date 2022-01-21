import use_midi_input from './use_midi_input.js'

export default async ({ navigator }) => {
  
  let access
  let inputs

  if(!navigator.requestMIDIAccess) {
    throw new Error('El navegador que estas usando no puede manejar MIDI. Proba con otro navegador (Chrome, Edge, Opera)')
  }

  async function get_access() {
    return await navigator.requestMIDIAccess()
  }

  async function get_inputs() {
    return Array.from(access.inputs.values())
  }

  async function init() {
    access = await get_access()
    inputs = await get_inputs()

    access.onstatechange = () => {
      inputs = get_inputs()
    }
  }

  await init()
  
  return {

    find_input(name) {
      let input
      input = inputs.find(input => input.name === name)
      input = use_midi_input(input)
      return input
    }
    
  }
}