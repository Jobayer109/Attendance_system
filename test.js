const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(async () => {
    console.log("Database connected");
    await createUser({ name: "Tanvir", email: "tanvir@gmail.com" });
    // mongoose.connection.close();
  })
  .catch((e) => {
    console.log(e.message);
  });

const schema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", schema);

function createUser(data) {
  const user = new User({ ...data });
  user.save();
  return user;
}
