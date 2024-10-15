const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "auth",
    required: true,
  },
  media: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const diaryModel = mongoose.model("diary", diarySchema);
module.exports = diaryModel;
