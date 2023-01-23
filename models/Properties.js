import mongoose from "mongoose";
const Propertieschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  categories: {
    type: Array,
    required: false,
  },
  datePosted: {
    type: String,
    required: true,
  },

  authorName: {
    type: String,
    required: true,
  },
  desc1: {
    type: Array,
    required: true,
  },
  desc2: {
    type: String,
    required: true,
  },
  detail1: {
    type: String,
    required: true,
  },
  detail2: {
    type: String,
    required: true,
  },
  detail3: {
    type: String,
    required: true,
  },
  detail4: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Properties", Propertieschema);
