const mongoose = require("mongoose");
const postauth = mongoose.Schema({
  name: String,
  image: String,
  link: String,
});
module.exports = mongoose.model("POSTAUTH", postauth);
