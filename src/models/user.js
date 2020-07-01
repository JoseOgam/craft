var mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcrypt");
// user model structure
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("wrong password");
      }
    },
  },
});
userSchema.pre("save", async function (next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 6);
  }
  next();
});
var User = mongoose.model("User", userSchema);

module.exports = User;
