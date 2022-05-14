import { MongoClient } from 'mongodb'

const {
  MONGO_URI,
  MONGO_DB,
} = process.env

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

export let dbConnection

export const dbConnectionOpen = () => client.connect(() => {
  dbConnection = client.db(MONGO_DB)
})

export default client