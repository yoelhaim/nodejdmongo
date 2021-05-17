const express = require("express");
const mongo = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const app = express();
const port = 3000;

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
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

};
//// connect to mongo db
// mongo.connect(
//   "mongodb+srv://youmer:zaza1996@cluster0.rsyiu.gcp.mongodb.net/myFirstDatabase"
// );
// const conn = mongo.connection;
// conn.on("connected", () => console.log("successfully coonect to mongo db"));
// conn.on("error", () => console.log("error connect to  mongo "));
const uri =
  "mongodb+srv://youmer:zaza1996@alcoran.3p7in.mongodb.net/Alcoran?retryWrites=true&w=majority";
// mongo.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongo.connect(uri, options, function (error) {});

// Or using promises
mongo.connect(uri, options).then(
  () => {
    app.set(process.env.PORT || port, () =>
      console.log("success cvonnect to :" + port)
    );
  },
  (err) => {
    /** handle initial connection error */
  }
);
const conn = mongo.connection;
conn.on("connected", () => console.log("successfully coonect to mongo db"));
conn.on("error", () => console.log("error connect to  mongo "));
//////middlewaire
app.post("/addft", middle);
app.post("/addvideos", middle);
app.delete("/addvideos/video/:id", middle);
//////fin middlewaire

app.get('/', (req,res)=>{
res.send("hello ");
})

app.use("/add", postAuth);
app.use("/addvideos", viDeos);
app.use("/users", Auth);

module.exports = app;
