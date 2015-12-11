var defineError = require('define-error')

module.exports = {
  NextCancelledError: defineError('NextCancelledError', cancelled)
}

function cancelled (msg, destroyed) {
  this.destroyed = !!destroyed
}
