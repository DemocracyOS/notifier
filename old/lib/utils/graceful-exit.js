module.exports = function gracefulExit (callback) {
  function graceful() {
    callback((err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      process.exit(0)
    })
  }

  process.on('SIGTERM', graceful)
  process.on('SIGINT' , graceful)
}
