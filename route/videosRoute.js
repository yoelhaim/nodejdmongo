const express = require("express");
const router = express.Router();
const {
  addVideo,
  GeVideo,
  simpleVideo,
  DeletedVideo,
} = require("../logic/videoLogic");

router.post("/", addVideo);
router.get("/allvideo", GeVideo);
router.get("/video/:id", simpleVideo);
router.delete("/video/:id", DeletedVideo);

module.exports = router;
