var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  firstname: {
    type: String,
    default: ""
  },
  lastname: {
    type: String,
    default: ""
  },
  company: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
