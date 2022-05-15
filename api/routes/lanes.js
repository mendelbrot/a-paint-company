import { db } from '../lib/mongo.js'
import * as R from 'ramda'

// list of all lanes and the paints that are in them
const GET = async (req, res) => {
  try {
    const paints = await db.collection('paints').find().toArray()
    const settings = await db.collection('settings').findOne()
    
    // construct the lanes so that they include the paints that fall in their slot
    const lanes = settings.swim_lanes.map(lane => {
      lane.paints = paints.filter(paint => {
        if (!R.isNil(lane.min_qty)) {
          if (paint.qty < lane.min_qty) {
            return false
          }
        }
        if (!R.isNil(lane.max_qty)) {
          if (paint.qty > lane.max_qty) {
            return false
          }
        }
        return true
      }).sort((a, b) => a.qty - b.qty)
      return lane
    })

    res.json(lanes)
  } catch (error) {
    res.status(500).send(error?.message)
  }
}

const paints = {
  GET
}
export default paints