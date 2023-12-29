const { Schema, model } = require("mongoose");

const personSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  avatar: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Person = model("Person", personSchema);
module.exports = Person;
