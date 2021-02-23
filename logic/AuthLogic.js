const Auth = require("../controller/auth.controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
module.exports = {
  addUser: async (req, res) => {
    let checkemail = Auth.find({
      email: req.body.email,
    });
    if ((await checkemail).length > 0) {
      res.status(501);
      res.json({
        message: "this account elraedy exits",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.json({
            message: "error  passsword  hash",
          });
        } else {
          const username = req.body.nameuser.replace(" ", "");
          let date = new Date();
          const Addusers = await new Auth({
            nameuser: req.body.nameuser,
            username: username,
            email: req.body.email,
            date_insc: date,
            password: hash,
            type: 1,
            stt: 1,
          }).save();
          const token = jwt.sign(
            { email: req.body.email, username: username },
            "Alkoran",
            config.secret,
            {
              expiresIn: 586400, // expires in 24 hours
            }
          );
          res.status(200);
          res.json({
            message: "succefully add account",
            token: token,
          });
        }
      });
    }
  },
  signin: async (req, res) => {
    let checkLogin = await Auth.find({ email: req.body.email });
    if (checkLogin.length > 0) {
      bcrypt.compare(
        req.body.password,
        checkLogin[0].password,
        async (err, result) => {
          if (err) {
            return res.json({
              message: "password incroccet",
            });
            res.status(404);
          }
          if (result) {
            const token = jwt.sign(
              { email: checkLogin[0].email, username: checkLogin[0].username },
              "Alkoran",
              config.secret,
              {
                expiresIn: 586400, // expires in 24 hours
              }
            );

            return res.json({ message: "user lognin ", token: token });
          } else {
            return res.json({ message: "info incorrect " });
          }
        }
      );
    } else {
      return res.json({ message: "email incorrect " });
    }
  },
};
