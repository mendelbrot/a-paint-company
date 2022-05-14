import express from 'express'
import { dbConnection } from '../lib/mongo.js'
const router = express.Router()

router.get('/paints', (req, res) => {
  dbConnection.collection('paints').find({}).toArray((error, data) => {
    if (error) {
      res.status(400).send('Error fetching data')
    } else {
      res.json(data)
    }
  })
})

export default router