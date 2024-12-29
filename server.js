const express = require('express')
require('dotenv').config()
const { appConfig }   = require('./config/appConfig')

const colors = require("colors");

const app = express()

/**
 * Gestion des sessions
 * On envoie l'id de la session sous forme de cookie
 */
const sessionApp = require('./session/session')
app.use(sessionApp)

/**
 * Gestion des cookies
 * 
 */
const cookieParser = require('cookie-parser')
app.use(cookieParser())

/**
 * Permet de gérer les cors
 */
const cors = require('cors')
var corOptions = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true // Permet d'envoyer le cookie de connexion
}
// middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

// routers
const productRouter = require('./routes/productRouter')
const reviewRouter = require('./routes/reviewRouter')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

app.use('/api/products', productRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/users', userRouter)
app.use('/api/auths', authRouter)

// const PORT = process.env.APP_PORT || 8080

// testing api
app.get('/', (req, res) => {
    res.json({ message: 'hello from Api ooooo'})
})

app.listen(appConfig.port, () => {
    console.log(`Server is running on port ${appConfig.port}`.bgMagenta.white)
    console.log(`http://localhost:${appConfig.port} `.bgMagenta.white)
}).on('error', err => console.log('Server ignition failed:\n', err))