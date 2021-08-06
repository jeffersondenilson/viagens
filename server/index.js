require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost/travels";

// database
mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  // handle error on first connection
  .catch((err) => console.log("ERROR connecting to mongoDB " + err));
// handle error after first connection
mongoose.connection.on(
  "error",
  console.error.bind(console, "ERROR connecting to mongoDB")
);
mongoose.connection.once("open", () =>
  console.log("Succeeded connected to mongoDB")
);

// api
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  // serve static files (production)
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // send index.html for other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`app listening at PORT ${port}`);
});
