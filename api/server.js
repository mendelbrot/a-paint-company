import 'dotenv/config'
import express from 'express'
import path, { join } from 'path'
import routes from './routes/index.js'
import { dbConnectionOpen } from './lib/mongo.js'
const app = express()
const port = process.env.PORT || 9000
const __dirname = path.resolve()

const {
  STAGE
} = process.env

// open a connection with mongodb
dbConnectionOpen()

// allow CORS in dev
if (STAGE == 'dev') {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
  })
}


// serve api
app.use('/api', routes)

// serve frontend static resources
app.use(express.static(join(__dirname, '../build')))
app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, '../build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})


