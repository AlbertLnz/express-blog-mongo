import dotenv from 'dotenv'
import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts'
import mainRouter from './server/routes/mainRouter.js'
import connectDB from './server/config/db.js'
import adminRouter from './server/routes/adminRouter.js' 
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// MongoDB connection
connectDB()

// Middlewares
app.use(express.static('public'))
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('layout', './layouts/main') // per default, all my views render() this layout
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}))

app.use('/', mainRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})