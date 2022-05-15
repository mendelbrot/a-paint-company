import express from 'express'
import paints from './paints.js'
const router = express.Router()

router.post('/paints', paints.POST)
router.get('/paints', paints.GET)
router.put('/paints', paints.PUT)
router.delete('/paints/:id', paints.DELETE)

export default router


