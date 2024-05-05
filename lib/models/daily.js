import mongoose from "mongoose";

const Daily = new mongoose.Schema({
  dailyPub: {
    type: String,
    required: true,
  },
});

const daily = mongoose.models.daily || mongoose.model("daily", Daily);

export default daily;