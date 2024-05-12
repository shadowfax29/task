const mongoose = require("mongoose");

const connectiondb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("connected to db");
  } catch (err) {
    console.log("connection error");
  }
};

module.exports = connectiondb;
