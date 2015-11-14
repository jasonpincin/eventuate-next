# eventuate-next

[![NPM version](https://badge.fury.io/js/eventuate-next.png)](http://badge.fury.io/js/eventuate-next)
[![Build Status](https://travis-ci.org/jasonpincin/eventuate-next.svg?branch=master)](https://travis-ci.org/jasonpincin/eventuate-next)
[![Coverage Status](https://coveralls.io/repos/jasonpincin/eventuate-next/badge.png?branch=master)](https://coveralls.io/r/jasonpincin/eventuate-next?branch=master)

Act upon the next produced value of an eventuate

## example

```javascript
var eventuate = require('eventuate-core'),
    next      = require('eventuate-next')

var service = {
    login: eventuate()
}

// with a callback
next(service.login, function (err, user) {
    if (err) console.error(err)
    console.log(user.name + ' logged in!')
})

// or with a promise
next(service.login).then(function (user) {
    console.log(user.name + ' logged in!')
}).catch(console.error)


service.login.produce({ name: 'John' }) // will be logged (twice)
service.login.produce({ name: 'Tim' }) // will not be logged
```

## api

```javascript
var next = require('eventuate-next')
```

### next(eventuate [, cb])

`next` requires a (non-basic) `eventuate` as it's 1st argument, and optionally
accepts an error-first callback, `cb`, as a 2nd argument. The `next` function 
returns a `Promise`. When the given `eventuate` produces it's next value, the 
`Promise` will resolve with the value. If a callback was provides, it will be
executed with a falsy error and the value. 

If, while `next` is waiting on a value to be produces, the consumer that `next`
attaches to the `eventuate` is removed, or the `eventuate` is destroyed, then
the `Promise` will be rejected with a `NextCancelledError` (see below). If a
callback was provided, it will be executed with the `NextCancelledError`. The
error object will have a property of `destroyed` which will be a boolean, and
can be used to determine if the `eventuate` was destroyed, or if an action
removed the `next` consumer while leaving the `eventuate` in-tact.

## errors

```javascript
var errors = require('eventuate-next/errors')
```

### errors.NextCancelledError

Constructor of error supplied to callback or Promise rejection in the event the
`next` consumer is removed or the `eventuate` is destroyed before the
`eventuate` produces a value.

## install

With [npm](https://npmjs.org) do:

```
npm install --save eventuate-next
```

## testing

`npm test`

Or to run tests in phantom: `npm run phantom`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
