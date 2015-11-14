var eventuate = require('eventuate-core'),
    next      = require('..')

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
