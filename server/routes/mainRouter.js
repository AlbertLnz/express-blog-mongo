import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

router.get('/', async (_req, res) => {

  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with NodeJS, ExpressJS & MongoDB" 
  }

  try {
    
    const data = await Post.find()
    res.render('index', { locals, data })

  } catch (error) {
    
    console.log(error)

  }

})

router.get('/about', (_req, res) => {
  res.render('about')
})

export default router 