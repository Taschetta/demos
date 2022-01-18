// audio context

const context = new AudioContext()

// oscillator

const oscillator = context.createOscillator()
oscillator.frequency.value = 440

// gain

let amp_time_attack = .01
let amp_time_release = .9

const amp = context.createGain()

amp.gain.value = 0

function amp_gate(time) {
  // start
  amp.gain.linearRampToValueAtTime(0, time);
  // attack
  amp.gain.linearRampToValueAtTime(.5, time + amp_time_attack);
  // decay
  amp.gain.linearRampToValueAtTime(0, time + amp_time_attack + amp_time_release);
}

// connections

oscillator
  .connect(amp)
  .connect(context.destination)

// start

let tempo = 60
let time_next = 1
let time_schedule_ahead = 0.1
let ms_lookahead = 25

oscillator.start(time_next)

function loop() {
  if(time_next < context.currentTime + time_schedule_ahead) {
    console.log(`scheduling play for time: ${time_next}`)
    amp_gate(time_next)
    time_next += 60 / tempo
  }
  setTimeout(loop, ms_lookahead);
}

function play() {
  tempo = 60
  time_next = context.currentTime
  loop()
}

function stop() {
  tempo = 0
}

// Controls

const button_play = document.querySelector('#button-play')
const button_stop = document.querySelector('#button-stop')

button_play.addEventListener('click', play)
button_stop.addEventListener('click', stop)