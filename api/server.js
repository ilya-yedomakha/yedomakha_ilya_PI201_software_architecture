require('dotenv').config();
const express = require('express');
const app = express();

app.get("/", (req, res) => {
  console.log("3000 is here")
    res.send("Hello, 3001!");
    res.end();
});

module.exports = app;