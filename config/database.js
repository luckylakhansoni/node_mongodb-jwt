//Set up mongoose connection
console.log('in db config');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://0.0.0.0:27017/employee';
mongoose.connect(mongoDB);
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  })
  mongoose.connection.on("error", err => {
    console.log("newError", JSON.stringify(err), err.message)
  })
mongoose.Promise = global.Promise;
module.exports = mongoose;