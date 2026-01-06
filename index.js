import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/auth.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'EDITCO starts' })
})

// Connect DB and start server
connectDB()
  .then(() => {
    console.log('Mongoose connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log('Started on', PORT)
    })
  })
  .catch((e) => {
    console.log(e)
  })
