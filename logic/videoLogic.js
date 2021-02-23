const Video = require("../controller/video.controller");
module.exports = {
  addVideo: async (req, res) => {
    // const dataV = await Video.find({})
    const url = req.body.url
      .replace("https://www.youtube.com/watch?v=", "")
      .replace("https://m.youtube.com/watch?v=", "")
      .replace("https://youtube.com/watch?v=", "")
      .substring(0, 11);
    if (url == "") {
      res.status(404);
      res.json({
        message: "error  empty title",
      });
    } else if (req.body.title == "") {
      res.status(404);
      res.json({
        message: "error  empty url",
      });
    } else if (req.body.desc == "") {
      res.status(404);
      res.json({
        message: "error  empty desc ",
      });
    } else {
      let originalString = req.body.title;
      let bufferObj = Buffer.from(originalString);
      let link = bufferObj.toString("base64");
      let date = new Date();
      let addData = await new Video({
        desc: req.body.desc,
        title_p: req.body.title,
        id_link: link,
        date_p: date,
        url_p: url,
        type: req.body.type,
        ep_p: req.body.ep,
        id_link_user: req.body.id_link_user,
        views: 0,
      }).save();
      res.status(200);
      res.json({
        message: "tank you ",
      });
    }
  },
  GeVideo: async (req, res) => {
    let data = await Video.find();
    if (data.length > 0) {
      res.send(data);
      res.status(200);
    } else {
      res.status(404);
      res.json({
        message: " error  get video ",
      });
    }
  },

  simpleVideo: async (req, res) => {
    let data = await Video.find({ id_link: req.params.id });
    if (data.length > 0) {
      res.send(data[0]);
      res.status(200);
    } else {
      res.status(404);
      res.json({
        message: " error  get video ",
      });
    }
  },
  DeletedVideo: async (req, res) => {
    let data = await Video.find({ id_link: req.params.id });
    if (data.length > 0) {
      let deletedata = await Video.deleteOne(
        { id_link: req.params.id },
        function (err) {
          if (!err) {
            res.json({
              message: "successfully deleted",
            });
          } else {
            res.status(500);
            res.json({
              message: " error Deleted" + err,
            });
          }
        }
      );
    } else {
      res.status(404);
      res.json({
        message: " cannot find this post try again",
      });
    }
  },
};
