require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes.js");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://skill-trade-two.vercel.app",
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/trade", tradeRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
