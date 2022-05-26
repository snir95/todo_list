const express = require('express')
const cors = require('cors')
const app = express()
const {default: mongoose} = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

const port = process.env.PORT

app.use(bodyParser.json())
app.use(cors())
app.use('/', (req, res, next) => {
    console.log('test', req.body)
    next()
})

const tasksRoute = require('./routes/todos')
app.use('/tasks', tasksRoute)

mongoose.connect(process.env.DB_CONNECTION12, function (err) {
    console.log(err)
})

app.listen(port, () => {
    console.log(`the app is listening to port : ${port}`)
})
