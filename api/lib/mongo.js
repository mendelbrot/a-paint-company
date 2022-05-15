import { MongoClient } from 'mongodb'

const {
  MONGO_URI,
  MONGO_DB,
} = process.env

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// the database to query on
export let db

// the function to initiate the database connection
export const dbConnectionOpen = () => client.connect(() => {
  db = client.db(MONGO_DB)
})


export default client