import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.render('index')
})

router.get('/about', (_req, res) => {
  res.render('about')
})

export default router 