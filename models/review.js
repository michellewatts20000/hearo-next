import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  place:
  {
    type: Schema.Types.ObjectId,
    ref: 'Place',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  rating: {
    type: String,
    required: [true, 'You must rate the place.'],
  },
  comment: {
    type: String
  }
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;