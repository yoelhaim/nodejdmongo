const express = require("express");
const router = express.Router();
const { addpost, getPost, findOne } = require("../logic/postAuthLogic");

router.post("/", addpost);
router.get("/data", getPost);
router.get("/dataone/:id", findOne);

module.exports = router;
