var express = require("express");
var router = express.Router();
var User = require("../models/user");
const { update } = require("../models/user");

//create user using post method(Create)
router.post("/users", async (req, res) => {
  var user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get user using get method(Read)
router.get("/users", async (req, res) => {
  try {
    var users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Delete user method (del)
router.delete("/users/:id", async (req, res) => {
  var id = req.params.id;
  try {
    var user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Update Method
router.patch("/users/:id", async (req, res) => {
  var updates = Object.keys(req.body);
  var allowesUpdates = ["name", "email", "age", "password"];
  var validOperation = updates.every((update) =>
    allowesUpdates.includes(update)
  );
  if (!validOperation) {
    return res.status(400).send({ error: "invalid operation" });
  }
  try {
    var user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//login user
router.post("/users/login", async (req, res) => {
  try {
    var user = await User.findByCredentials(req.body.email, req.body.password);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
