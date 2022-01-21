
export default ({ midi }) => {
  const input = midi.find_input('nanoKONTROL2')

  const nano_kontrol_cc = {}

  const bindings = []
  
  input.on_message(([status, data_a, data_b]) => {
    nano_kontrol_cc[data_a] = data_b
    
    bindings.forEach(binding => {
      binding([status, data_a, data_b])
    })
  })
  
  return {
    data: nano_kontrol_cc,
    on_input: (callback) => {
      bindings.push(callback)
    }
  }
}