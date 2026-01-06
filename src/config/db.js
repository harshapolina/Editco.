import mongoose from 'mongoose'

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://harshapolina1_db_user:hvs2006@project-1.jscyy6f.mongodb.net/?appName=Project-1')
}

export default connectDB

