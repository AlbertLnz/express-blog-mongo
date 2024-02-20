import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {

  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with NodeJS, ExpressJS & MongoDB" 
  }

  res.render('index', locals)
})

router.get('/about', (_req, res) => {
  res.render('about')
})

export default router 