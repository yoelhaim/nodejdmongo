const express = require("express");
const mongo = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const app = express();
const port = 9000;
const postAuth = require("./route/postAuthRoute");
const viDeos = require("./route/videosRoute");
const Auth = require("./route/authRoute");
const middle = require("./middleware/checktoken");
app.use([
  express.json(),
  bodyparser.urlencoded({ extended: true }),
  express.urlencoded({ extended: true }),
  cors(),
  bodyparser.json(),
  fileUpload({
    createParentPath: true,
  }),
  morgan("dev"),
]);
//// connect to mongo db
mongo.connect(
  "mongodb+srv://youmer:zaza1996@cluster0.rsyiu.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
const conn = mongo.connection;
conn.on("connected", () => console.log("successfully coonect to mongo db"));
conn.on("error", () => console.log("error connect to  mongo "));

//////middlewaire
app.post("/addft", middle);
app.post("/addvideos", middle);
app.delete("/addvideos/video/:id", middle);
//////fin middlewaire

app.use("/add", postAuth);
app.use("/addvideos", viDeos);
app.use("/users", Auth);
app.listen(port, () => console.log("success cvonnect to :" + port));
module.exports = app;
