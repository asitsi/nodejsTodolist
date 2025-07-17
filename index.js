require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')

//local imports
const connectDb = require('./db.js')
const employeeRoutes = require('./controllers/employee.controller')
const { errorHandler } = require('./middlewares')

const app = express()
//middleware
app.use(bodyParser.json())

app.use('/api/list', employeeRoutes)
app.use(errorHandler)

// connectDbI()

connectDb()
    .then(() => {
        console.log('db connection succeeded.')
        app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
  console.log('Server started at', process.env.PORT || 8000);
});
    })
    .catch(err => console.log(err))

