import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema({
  name: String,
  url: String,
}, { _id: false });

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  freelancers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  status: {
    type: String,
    enum: ['pending_quote', 'awaiting_approval', 'in_progress', 'in_review', 'completed', 'cancelled'],
    required: true,
    index: true,
  },

  budget: {
    type: Number,
  },

  deadline: {
    type: Date,
  },

  files: [fileSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
