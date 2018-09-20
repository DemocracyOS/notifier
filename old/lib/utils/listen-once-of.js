module.exports = function listenOnceOf (emitter, callbacks) {
  const events = Object.keys(callbacks)
  const listeners = {}

  const removeListeners = () => {
    events.forEach((event) => {
      emitter.removeListener(event, listeners[event])
    })
  }

  events.forEach((event) => {
    const listener = listeners[event] = (...args) => {
      removeListeners()
      callbacks[event](...args)
    }

    emitter.once(event, listener)
  })
}
