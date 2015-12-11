var test               = require('tape'),
    eventuate          = require('eventuate-core'),
    next               = require('..'),
    NextCancelledError = require('../errors').NextCancelledError

test('next returns a promise that resolves', function (t) {
  t.plan(3)

  var event = eventuate()

  next(event).then(function (data) {
    t.equals(data, 'test', 'promise resolves with data')
  })
  t.equals(event.getConsumers().length, 1, '.consumers contains next consumer')
  event.produce('test')
  t.equals(event.getConsumers().length, 0,
           'next consumer removed from consumers promise resolves')
})

test('next returns a promise that rejects if consumer removed', function (t) {
  t.plan(2)

  var event = eventuate()

  next(event).then(function () {}, function (err) {
    t.ok(err instanceof NextCancelledError, 'err is a NextCancelledError')
    t.equal(err.destroyed, false)
  })
  event.removeAllConsumers()
})

test('next promise rejects if eventuate is destroyed', function (t) {
  t.plan(2)

  var event = eventuate()

  next(event).then(function () {}, function (err) {
    t.ok(err instanceof NextCancelledError, 'err is a NextCancelledError')
    t.equal(err.destroyed, true)
  })
  event.destroy()
})

test('next promise rejects if eventuate is already destroyed', function (t) {
  t.plan(2)

  var event = eventuate()
  event.destroy()

  next(event).then(function () {}, function (err) {
    t.ok(err instanceof NextCancelledError, 'err is a NextCancelledError')
    t.equal(err.destroyed, true)
  })
})
