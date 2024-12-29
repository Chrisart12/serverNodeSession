const session = require('express-session')

const sessionApp = session({
    secret: 'thisismysecretdonttellanymore!',
    saveUninitialized: false, // Permet de ne pas générer une session à chaque fois
    resave: false,
    cookie: {
        secure: false, 
        maxAge: 60000 * 60 // 1h
        // maxAge: 100000
    },

})

module.exports = sessionApp