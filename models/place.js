import { Schema, model, models } from 'mongoose';

const PlaceSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  placeName: {
    type: String,
    required: 'You need to put a place name!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
    placeTypes: {
    type: Array,
  },
  placeLocation: {
    type: String,
    required: true,
    trim: true,
  }
});

const Place = models.Place || model('Place', PlaceSchema);

export default Place;