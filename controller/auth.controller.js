const mongoose = require("mongoose");
const auth = mongoose.Schema({
  nameuser: String,
  username: String,
  email: String,
  date_insc: String,
  password: String,
  type: String,
  stt: String,
});
module.exports = mongoose.model("USER", auth);
