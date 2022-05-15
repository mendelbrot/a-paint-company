import { db } from '../lib/mongo.js'
import { ObjectId } from 'mongodb'
import * as R from 'ramda'

// create multiple from a list
const POST = async (req, res) => {
  try {
    await db.collection('paints').insertMany(req.body)
    res.end()
  } catch (error) {
    res.status(500).send(error?.message)
  }
}

// list of all
const GET = async (req, res) => {
  try {
    const data = await db.collection('paints').find().toArray()
    res.json(data)
  } catch (error) {
    res.status(500).send(error?.message)
  }
}

// edit multiple from a list
const PUT = async (req, res) => {
  try {
    let bulk = db.collection('paints').initializeUnorderedBulkOp()
    req.body.forEach(doc => {
      const findStatement = { _id: new ObjectId(doc._id) }
      const setStatement = R.omit(['_id'], doc)
      bulk.find(findStatement).updateOne({ $set: setStatement })
    })
    await bulk.execute()
    res.end()
  } catch (error) {
    res.status(500).send(error?.message)
  }
}

// delete single
const DELETE = async (req, res) => {
  try {
    const deleteId = new ObjectId(req.params.id)
    await db.collection('paints').deleteOne({ _id: deleteId })
    res.end()
  } catch (error) {
    res.status(500).send(error?.message)
  }
}

const paints = {
  POST,
  GET,
  PUT,
  DELETE
}
export default paints