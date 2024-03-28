import mongoose from "mongoose";

const pubs = new mongoose.Schema({
  author: String,
  avatar: String,
  title: {
    type: String,
    required: true,
    maxLenght: 25,
    minLenght: 1,
  },
  description: {
    type: String,
    required: true,
    maxLenght: 200,
    minLenght: 1,
  },
  image: {
    type: String,
    default: "",
  },
  comments: [
    {
      author: String,
      avatar: String,
      msg: {
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 200,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: { type: Date, default: Date.now },
  favourite: [],
  likes: []
});

const Pubs = mongoose.models.pubs || mongoose.model("pubs", pubs);

export default Pubs;
