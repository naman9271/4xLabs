import mongoose from 'mongoose';

const { Schema } = mongoose;

const quoteSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
    index: true,
  },

  amount: {
    type: Number,
    required: true,
    min: 0,
  },

  description: {
    type: String,
    required: true,
  },

  estimatedDuration: {
    type: String, // e.g., "2 weeks", "1 month"
    required: true,
  },

  status: {
    type: String,
    enum: ['draft', 'sent', 'accepted', 'rejected', 'expired'],
    default: 'draft',
    required: true,
    index: true,
  },

  validUntil: {
    type: Date,
    required: true,
  },

  terms: {
    type: String,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  sentAt: {
    type: Date,
  },

  respondedAt: {
    type: Date,
  },

  notes: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
