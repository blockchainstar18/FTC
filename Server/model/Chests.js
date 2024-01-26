const mongoose = require("mongoose");

const ChestsSchema = new mongoose.Schema({
  chests: {
    copper: {
      small: {
        type: Number,
        required: true,
        default: 0,
      },
      medium: {
        type: Number,
        required: true,
        default: 0,
      },
      big: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    silver: {
      small: {
        type: Number,
        required: true,
        default: 0,
      },
      medium: {
        type: Number,
        required: true,
        default: 0,
      },
      big: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    gold: {
      small: {
        type: Number,
        required: true,
        default: 0,
      },
      medium: {
        type: Number,
        required: true,
        default: 0,
      },
      big: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
});

module.exports = Chests = mongoose.model("chests", ChestsSchema);
