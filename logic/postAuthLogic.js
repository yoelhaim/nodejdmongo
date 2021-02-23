const postauth = require("../controller/postAuth.controller");
const fileUpload = require("express-fileupload");
module.exports = {
  addpost: async (req, res) => {
    const checkdata = await postauth.find({ name: req.body.name });
    if (checkdata.length >= 1) {
      res.status(404);
      res.json({
        message: "error add   already exits",
      });
    } else {
      try {
        if (!req.files) {
          res.status(500);
          res.json({
            message: "error selected image file",
          });
        } else {
          let filevatar = req.files.file;
          let originalString = req.body.name;
          let bufferObj = Buffer.from(originalString);
          let link = bufferObj.toString("base64");

          req.files.file.mv("./image/" + filevatar.name + ".png");
          if (req.body.name != "") {
            const add = await new postauth({
              name: req.body.name,
              image: filevatar.name,
              link: link,
            }).save();
            res.status(200);
            res.json({
              message: "successfully add account ",
              name: add.name,
            });
          } else {
            res.status(404);
            res.json({
              message: "error  empty name",
            });
          }
        }
      } catch (err) {
        res.status(404);
        res.json({
          message: "error uploading" + err,
        });
      }
    }
  },
  getPost: async (req, res) => {
    let Posts = await postauth.find();
    if (Posts.length > 0) {
      res.status(200);
      res.send(Posts);
    } else {
      res.status(404);
      res.json({
        message: "error ge data",
      });
    }
  },
  findOne: async (req, res) => {
    let dataOne = await postauth.find({ link: req.params.id });
    try {
      if (dataOne.length > 0) {
        res.status(200);
        res.send(dataOne[0]);
      } else {
        res.status(404);
        res.json({
          message: "error get data",
        });
      }
    } catch (err) {
      res.status(404);
      res.json({
        message: "probleme get data",
      });
    }
  },
};
