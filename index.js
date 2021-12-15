const express = require("express")
const app = express();
const cors = require("cors")
const cookies = require("cookies-parser");
require("dotenv").config();
const mongoose = require("mongoose");

//DB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection has been established"))
  .catch((err) => console.log("Could not connected to database : " + err));

//support application/json type
app.use(express.json());
//support application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//cross-domain requests
app.use(cors());
//
app.use(cookies());

const appRouter = require("./routes/userRouter");
app.use("/api", appRouter);

const PORT = process.env.PORT || 8000;
//Running PORT
app.listen(PORT, () => {
  console.log("Connected to PORT " + PORT);
});