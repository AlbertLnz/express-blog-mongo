import express from 'express'
import User from '../models/User.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../helpers/authMiddleware.js';
import Post from '../models/Post.js';

const router = express.Router()

const adminLayout = '../views/layouts/admin'

router.get('/', (_req, res) => {

  const locals = {
    title: "Admin Panel",
    description: "Blog - AlbertLnz" 
  }

  try {
    
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

export default router 