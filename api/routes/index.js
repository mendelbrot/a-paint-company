import express from 'express'
import paints from './paints.js'
const router = express.Router()

router.get('/paints', paints)

export default router


