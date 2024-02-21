import express from 'express'
import User from '../models/User.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../helpers/authMiddleware.js';
import Post from '../models/Post.js';

const router = express.Router()

const adminLayout = '../views/layouts/admin'

router.get('/', (req, res) => {

  const locals = {
    title: "Admin Panel",
    description: "Blog - AlbertLnz" 
  }

  try {
    
    if(req.cookies.token) {
      res.redirect('/admin/dashboard') // then this route has the middleware 'authMiddleware' that validates if token it's correct! To prevent insert 'token' cookie manually!!
    }

    res.render('admin/login', { locals, layout: adminLayout }) // specify which layout to render! If not, 'main' layout applied (app.js)

  } catch (error) {
    
    console.log(error)

  }

})

router.post('/register', async (req, res) => {

  try {
    
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      
      const user = await User.create({ username, password: hashedPassword })
      res.json({ message: 'User created!', user }).status(201)
      
    } catch (error) {
      
      if(error.code === 1000) res.json({ message: 'User already in use' }).status(409)

      res.json({ message: 'Internal Server Error' }).status(500)

    }

  } catch (error) {
    
    console.log(error)

  }

})

router.post('/login', async (req, res) => {

  const jwtSecret = process.env.JWT_SECRET
  const { username, password } = req.body

  const user = await User.findOne({ username })

  if(!user) {
    return res.json({ message: 'Invalid credentials' }).status(401)
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid) {
    return res.json({ message: 'Invalid credentials' }).status(401)
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret )
  res.cookie('token', token, { httpOnly: true })

  res.redirect('/admin/dashboard')

})

router.get('/dashboard', authMiddleware, async (_req, res) => {

  const locals = {
    title: "Admin Dashboard",
    description: "Admin Dashboard - AlbertLnz" 
  }

  try {
    
    const data = await Post.find() // Find all Posts

    res.render('admin/dashboard', { locals, data, layout: adminLayout })

  } catch (error) {
    
    console.log(error)

  }

})

// CRUD Admin:

router.get('/add-post', authMiddleware, (_req, res) => {

  const locals = {
    title: "Add new Post - Admin Panel",
    description: "Blog - AlbertLnz" 
  }

  res.render('admin/add-post' , { locals, layout: adminLayout })
})

router.post('/add-post', authMiddleware, async (req, res) => {

  try {
    
    const newPostData = new Post({
      title: req.body.title,
      body: req.body.body
    })

    await Post.create(newPostData)

    res.redirect('/admin/dashboard')

  } catch (error) {
    
    console.log(error)

  }

})

router.get('/edit-post/:id', authMiddleware, async (req, res) => {

  const locals = {
    title: "Edit Post - Admin Panel",
    description: "Blog - AlbertLnz" 
  }

  try {
    
    const postId = req.params.id
    const searchPost = await Post.findById(postId) // <------------- WAY 1
    // const searchPost = await Post.findOne({ _id: postId }) // <-- WAY 2
    
    res.render('admin/edit-post' , { locals, searchPost, layout: adminLayout })

  } catch (error) {
    
    res.json({ message: 'Error 404 - Post Not Found' }).status(404)

  }

})

router.put('/edit-post/:id', authMiddleware, async (req, res) => {

  try {

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    })

    res.redirect(`/admin/edit-post/${req.params.id}`)

  } catch (error) {
    
    res.json({ message: 'Error 500 - I cannot updated the Post' }).status(500)

  }

})

router.delete('/delete-post/:id', authMiddleware, async (req, res) => {

  try {
    
    await Post.deleteOne({ _id: req.params.id })

    res.redirect('/admin/dashboard')

  } catch (error) {
    
    res.json({ message: 'Unprocessable Entity' }).status(422)

  }

})

//Logout
router.get('/logout', (_req, res) => {

  // Clear the 'token' inside cookies
  res.clearCookie('token')
  res.redirect('/')
})

export default router 