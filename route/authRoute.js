const express = require("express");
const router = express.Router();
const { addUser, signin } = require("../logic/AuthLogic");
router.post("/", addUser);
router.post("/login", signin);
module.exports = router;
