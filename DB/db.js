const mongoose = require("mongoose");
const mongooseURI =
  "mongodb+srv://mubeenshahid232:JBuFOX7XshAtW5Fd@cluster0.wvrjy7f.mongodb.net/umrahride?retryWrites=true&w=majority";

const connectToMongoose = () => {
  mongoose
    .connect(mongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("connection successfull to DB");
    })
    .catch((error) => {

      console.log("error in connection ",error);
    });
};
module.exports = connectToMongoose;
