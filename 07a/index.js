
const input_frequency = document.querySelector('#frequency')
const input_oscillator_types = Array.from(document.querySelectorAll('.type'))
const input_gain_value = document.querySelector('#gain-value')

let gain
let gain_default_value = 0

let oscillator
let oscillator_default_frequency_value = 220



function init_audio_context() {
  const AudioContext = window.AudioContext
  const context = new AudioContext()

  oscillator = context.createOscillator()
  gain = context.createGain()

  oscillator.frequency.value = oscillator_default_frequency_value
  gain.gain.value = gain_default_value

  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(0)
}


function input_frequency_change(event) {
  oscillator.frequency.value = parseInt(event.target.value, 10)
}

function input_oscillator_type_change(event) {
  console.log(event.target.value)
  oscillator.type = event.target.value
}

function input_gain_value_change(event) {
  gain.gain.value = parseFloat(event.target.value, 10)
}

input_frequency.addEventListener('change', input_frequency_change)
input_gain_value.addEventListener('change', input_gain_value_change)

input_oscillator_types.map(input_oscillator_type => {
  input_oscillator_type.addEventListener('change', input_oscillator_type_change)
})

init_audio_context()
