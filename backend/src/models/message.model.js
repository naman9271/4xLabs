import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true,
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
    index: true,
  },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
