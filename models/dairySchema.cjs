const mongoose = require("mongoose");

const dairySchema = new mongoose.Schema({
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
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const dairyModel = mongoose.model("dairy", dairySchema);
module.exports = dairyModel;
