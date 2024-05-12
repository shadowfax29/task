const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const logSchema = new Schema(
  {
    
    time:String,
    taskId:String
    
  },
  { timestamps: true }
);

const Log = model("log", logSchema);

module.exports = Log;
