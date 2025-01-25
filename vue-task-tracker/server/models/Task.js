import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  dueDate: Date,
  hours: Number
})

export default mongoose.model('Task', taskSchema)