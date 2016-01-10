var Promise            = require('promise-polyfill'),
    after              = require('afterward'),
    NextCancelledError = require('./errors').NextCancelledError

module.exports = function eventuateNext (eventuate, cb) {
  if (typeof eventuate.consume !== 'function')
    throw new TypeError('first argument should be a non-basic eventuate')

  var done = eventuate.isDestroyed()
    ? Promise.reject(new NextCancelledError('eventuate destroyed', true))
    : new Promise(function nextPromise (resolve, reject) {
      var consumption = eventuate.consume(onData, onError)
      consumption.once('end', cancel)
      eventuate.once('destroy', cancel)

      function onData (data) {
        resolve(data)
        cleanup()
      }

      function onError (err) {
        reject(err)
        cleanup()
      }

      function cancel () {
        var err = eventuate.isDestroyed()
          ? new NextCancelledError('eventuate destroyed', true)
          : new NextCancelledError('eventuate consumer removed')
        reject(err)
        cleanup()
      }

      function cleanup () {
        consumption.removeListener('end', cancel)
        consumption.end()
      }
    })
  return after(done, cb)
}
