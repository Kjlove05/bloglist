const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const  blogsRouter  = require("./controllers/blogs");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

logger.info("connected to MongoDB");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
