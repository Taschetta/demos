import use_midi from './use_midi.js'
import use_nanokontrol from './use_nanokontrol.js'

let midi
let nanokontrol

const el_json = document.querySelector('#json')

function el_json_update(value) {
  el_json.innerHTML = JSON.stringify(value, null, 2)
}

async function init() {
  midi = await use_midi({ navigator })
  nanokontrol = await use_nanokontrol({ midi })
  nanokontrol.on_input(() => {
    el_json_update(nanokontrol.data)
  })
  el_json_update(nanokontrol.data)
}

function handle(error) {
  alert(error)
}

init().catch(handle)