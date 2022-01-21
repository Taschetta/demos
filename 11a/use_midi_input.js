
export default (input) => {
  return {
    on_message(callback) {
      input.onmidimessage = (message) => {
        const [status, data_a, data_b] = message.data
        callback([status, data_a, data_b])
      }
    }
  }
}