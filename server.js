var express = require("express");
const User = require("./models/user");
require("./db/mongoose");

var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());

//create user using post method
app.post("/users", (req, res) => {
  var user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

//Get user using get method
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});
app.listen(port, () => {
  console.log(`server is up on port ${port} `);
});
