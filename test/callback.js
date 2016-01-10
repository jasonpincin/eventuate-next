var test               = require('tape'),
    eventuate          = require('eventuate-core'),
    next               = require('..'),
    NextCancelledError = require('../errors').NextCancelledError

test('next accepts a callback', function (t) {
  t.plan(3)

  var event = eventuate()

  next(event, function consume (_, data) {
    t.equals(data, 'test', 'callback consumer receives data')
  })
  t.equals(event.consumers().length, 1,
           '.consumers should contain next consumer')
  event.produce('test')
  t.equals(event.consumers().length, 0,
           'next consumer removed from consumers after callback called')
})

test('callback receives error if eventuate consumer removed', function (t) {
  t.plan(2)

  var event = eventuate()

  next(event, function consume (err, data) {
    t.ok(err instanceof NextCancelledError, 'err is a NextCancelledError')
    t.equal(err.destroyed, false)
  })
  event.removeAllConsumers()
})

test('callback receives error if eventuate is destroyed', function (t) {
  t.plan(2)

  var event = eventuate()

  next(event, function consume (err, data) {
    t.ok(err instanceof NextCancelledError, 'err is a NextCancelledError')
    t.equal(err.destroyed, true)
  })
  event.destroy()
})

test('callback receives error if eventuate is already destroyed', function (t) {
  t.plan(2)

  var event = eventuate()
  event.destroy()

  next(event, function consume (err, data) {
    t.ok(err instanceof NextCancelledError, 'err is a NextCancelledError')
    t.equal(err.destroyed, true)
  })
})
