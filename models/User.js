const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: [3, { message: "Name should be more than 3 chars" }],
    maxLength: [10, { message: "Name shouldn't be more than 10 chars" }],
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: "Oops..please enter a valid email",
    },
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    type: [String],
    require: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: ["PENDING"],
  },
});

const User = model("User", userSchema);

module.exports = User;
