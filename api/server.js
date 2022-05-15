import express from 'express'
// import bodyParser from 'body-parser'
import path, { join } from 'path'
import routes from './routes/index.js'
import { dbConnectionOpen } from './lib/mongo.js'
const app = express()
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
const dir = path.resolve()

const {
  STAGE,
  PORT = 9000
} = process.env

// create a mongodb client
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

app.post(
  '/test',
  (req, res) => res.json(req.body)
)

// serve api
app.use('/api', routes)

// serve frontend static resources
app.use(express.static(join(dir, 'build')))
app.get('/*', function (req, res) {
  res.sendFile(join(dir, 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})


