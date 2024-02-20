import dotenv from 'dotenv'
import express from 'express'
import mainRouter from './server/routes/mainRouter.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use('/', mainRouter)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})