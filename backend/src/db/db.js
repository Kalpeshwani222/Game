const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`mongodb  connected`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
