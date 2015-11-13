var defineError = require('define-error')

module.exports.NextCancelledError = defineError('NextCancelledError', function (msg, destroyed) {
    this.destroyed = !!destroyed
})
