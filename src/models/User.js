import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    emailID: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!['male', 'female', 'other'].includes(value)) {
          throw new Error('Invalid gender')
        }
      }
    }
  },
  { timestamps: true }
)

const User = mongoose.model('togetherapp', registerSchema)
export default User

