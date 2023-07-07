const mongoose = require("mongoose");

module.exports = dbConnection = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
