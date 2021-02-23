const mongoose = require("mongoose");
const Video = mongoose.Schema({
  desc: String,
  title_p: String,
  id_link: String,
  date_p: String,
  url_p: String,
  ep_p: String,
  id_link_user: String,
  type: String,
  views: Number,
});
module.exports = mongoose.model("VIDEO", Video);
