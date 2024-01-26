const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
  },
  balances: {
    copper: {
      type: Number,
      required: true,
      default: 0,
    },
    silver: {
      type: Number,
      required: true,
      default: 0,
    },
    gold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});

module.exports = Account = mongoose.model("account", AccountSchema);
