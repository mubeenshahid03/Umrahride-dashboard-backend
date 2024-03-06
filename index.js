const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const connectToMongoose = require("./DB/db");
connectToMongoose();
const vehiclesRouter = require("./routes/vehicles");
const authRouter = require("./routes/auth");
//routes
app.use("/api/vehicles", vehiclesRouter);
//routes
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT;
app.get("/", (request, response) => {
  response.send("hello from umrahride dashboard backend");
});
app.listen(PORT, () => {
  console.log(`app listening at ${PORT}`);
});
