require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//Creates an express app
const app = express()

//Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)

//Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listens for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to database and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })