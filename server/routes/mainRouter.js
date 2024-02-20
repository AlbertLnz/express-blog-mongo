import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

router.get('/', async (req, res) => {

  const locals = {
    title: "NodeJS Blog",
    description: "Simple Blog created with NodeJS, ExpressJS & MongoDB" 
  }

  try {

    // · data for show all Posts:
    // const data = await Post.find()
    // res.render('index', { locals, data })

    // · data with query to show per nº of pages:
    let perPage = 6
    let page = req.query.page || 1
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]).skip(perPage * page - perPage).limit(perPage).exec()
    const count = await Post.countDocuments()
    const nextPage = parseInt(page) + 1
    const hasNextPage = nextPage <= Math.ceil(count / perPage)
    res.render('index', { locals, data, current: page, nextPage: hasNextPage ? nextPage : null })

  } catch (error) {
    
    console.log(error)

  }

})

router.get('/posts/:id', async (req, res) => {

  try {
    
    let slug = req.params.id

    const data = await Post.findById({ _id: slug })

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJS, ExpressJS & MongoDB" 
    }

    res.render('post', { locals, data })

  } catch (error) {
    
    console.log(error)
    
  }

})

router.get('/about', (_req, res) => {
  res.render('about')
})

export default router 