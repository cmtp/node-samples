const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const app = express();

app.get("/user", (req, res) => {
  let from = req.query.from || 0;
  from = Number(from);
  let limit = req.query.limit || 5;
  limit = Number(limit);

  User.find({})
  .skip(from)
  .limit(limit)
    .exec( (err, users) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: err
        });
      }
      res.json({
        ok: true,
        users
      });
    })
});

app.post("/user", (req, res) => {
  let body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

app.put("/user/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "img", "role", "state"]);

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        user: userDB
      });
    }
  );
});

app.delete("/user/:id", (req, res) => {
  res.json("delete User");
});

module.exports = app;
