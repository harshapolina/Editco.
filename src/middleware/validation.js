export const validateSignupData = (req) => {
  const { firstName, lastName, emailID, password, gender, age } = req.body

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required')
  }

  if (!emailID) {
    throw new Error('Email is required')
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  if (!gender || !['male', 'female', 'other'].includes(gender)) {
    throw new Error('Valid gender is required')
  }

  if (!age || age < 1 || age > 120) {
    throw new Error('Valid age is required')
  }
}

