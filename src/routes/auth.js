import { Router } from 'express'
import { registration, login, logout } from '../controllers/authController.js'

const router = Router()

// Register route
router.post('/register', registration)

// Login route
router.post('/login', login)

// Logout route
router.post('/logout', logout)

export default router

