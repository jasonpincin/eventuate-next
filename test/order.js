var test      = require('tape'),
    eventuate = require('eventuate-core'),
    next      = require('..')

test('next executes in expected order #1', function (t) {
    t.plan(2)

    var event1 = eventuate()
    var event2 = eventuate()
    var next2Happened = false
    var event2Happened = false

    next(event1, function consume (data) {
        t.equals(event2Happened, true)
        t.equals(next2Happened, false)
    })
    event2(function () {
        event2Happened = true
    })
    next(event2, function consume (data) {
        next2Happened = true
    })
    event1.produce('a')
    event2.produce('b')
})

test('next executes in expected order #2', function (t) {
    t.plan(2)

    var event1 = eventuate()
    var event2 = eventuate()
    var next2Happened = false
    var event2Happened = false

    next(event1, function consume (data) {
        t.equals(event2Happened, true)
        t.equals(next2Happened, false)
    })
    next(event2, function consume (data) {
        next2Happened = true
    })
    event2(function () {
        event2Happened = true
    })
    event1.produce('a')
    event2.produce('b')
})
