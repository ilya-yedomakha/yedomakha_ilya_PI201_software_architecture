const express = require("express");
const app = express();
const axios = require("axios");
var config = require('./config.js');


app.get("/", async (req, res) => {
      var response = await axios.get(`//${config.get("URL")}`);
      console.log(response.data);
      res.send("Message from 3000: "+ response.data);
  });


module.exports = app;