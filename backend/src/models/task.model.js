import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true,
  },

  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  status: {
    type: String,
    enum: ['todo', 'in_progress', 'in_review', 'done'],
    required: true,
    index: true,
  },

  dueDate: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
