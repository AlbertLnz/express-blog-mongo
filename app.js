import dotenv from 'dotenv'
import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts'
import mainRouter from './server/routes/mainRouter.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(express.static('public'))
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('layout', './layouts/main')

app.use('/', mainRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})