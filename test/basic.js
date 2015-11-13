var test           = require('tape'),
    basicEventuate = require('eventuate-core/basic'),
    next           = require('..')

test('basic eventuates not supported', function (t) {
    t.plan(1)

    var event = basicEventuate()
    t.throws(function () {
        next(event, function (v) { return v === 1 })
    }, TypeError, 'throws a type error')
})
