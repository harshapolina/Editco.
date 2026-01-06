import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validateSignupData } from '../middleware/validation.js'

// Register user
export const registration = async (req, res) => {
  try {
    validateSignupData(req)

    const { firstName, lastName, emailID, password, gender, age } = req.body

    const existingUser = await User.findOne({ emailID })

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered'
      })
    }

    const hashing = await bcrypt.hash(password, 10)

    const newuser = new User({
      firstName,
      lastName,
      emailID,
      password: hashing,
      gender,
      age
    })

    await newuser.save()

    res.status(201).json({
      message: 'User registered successfully'
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { emailID, password } = req.body

    const userexists = await User.findOne({ emailID })

    if (!userexists) {
      return res.status(400).json({
        message: 'Invalid EmailID or EmailID not registered'
      })
    }

    const isMatch = await bcrypt.compare(password, userexists.password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Password'
      })
    }

    const token = jwt.sign({ _id: userexists._id }, process.env.JWT_SECRET || 'MyToken', { expiresIn: '1h' })
    
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000)
    })

    res.status(200).json({
      message: 'Login Successful'
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

// Logout user
export const logout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    message: 'Logout successful'
  })
}

