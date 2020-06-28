var mongoose = require("mongoose");
var validator = require("validator");
mongoose.connect("mongodb://127.0.0.1:27017/trials-api", {
  useUnifiedTopology: true,
  useCreateIndex: true,
});
