const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.json("get User");
  });
  
  app.post("/user", (req, res) => {
    let body = req.body;
  
    if (body.name === undefined) {
      res.status(400).json({
        ok: false,
        message: "The name is required"
      });
    }
    res.json({ person: body });
  });
  
  app.put("/user/:id", (req, res) => {
    let id = req.params.id;
  
    res.json({ id });
  });
  
  app.delete("/user/:id", (req, res) => {
    res.json("delete User");
  });

  module.exports = app;