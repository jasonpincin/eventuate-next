var Promise            = require('promise-polyfill'),
    after              = require('afterward'),
    NextCancelledError = require('./errors').NextCancelledError

module.exports = function eventuateNext (eventuate, cb) {
    if (typeof eventuate.destroyed !== 'function')
        throw new TypeError('first argument should be a non-basic eventuate')

    var done = eventuate.isDestroyed()
    ? Promise.reject(new NextCancelledError('eventuate destroyed', true))
    : new Promise(function nextPromise (resolve, reject) {
        nextConsumer.removed = nextConsumerRemoved
        eventuate.consume(nextConsumer)

        function nextConsumer (data) {
            resolve(data)
            cleanup()
        }

        function nextConsumerRemoved () {
            var err = eventuate.isDestroyed()
                ? new NextCancelledError('eventuate destroyed', true)
                : new NextCancelledError('eventuate consumer removed')
            reject(err)
            cleanup()
        }

        function cleanup () {
            eventuate.removeConsumer(nextConsumer)
        }
    })
    return after(done, cb)
}
