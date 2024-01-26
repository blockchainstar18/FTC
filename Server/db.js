const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get("mongoURI");

const mongoURI =
  "mongodb+srv://blockchainstar18:3366Gol8@cluster0.7nwcpni.mongodb.net/chest";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
