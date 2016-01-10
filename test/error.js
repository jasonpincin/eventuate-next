var test               = require('tape'),
    eventuate          = require('eventuate-core'),
    next               = require('..')

test('requires an eventuate', function (t) {
  t.plan(1)

  t.throws(function () {
    next({}, function () {})
  }, TypeError)
})

test('next produces errors', function (t) {
  t.plan(1)

  var event = eventuate()

  next(event, function consume (err, data) {
    t.ok(err instanceof Error, 'received error')
  })
  event.produceError(new Error('boom'))
})
