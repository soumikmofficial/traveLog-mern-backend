require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// other imports
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// packages
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(morgan("tiny"));
app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// .............routes.............
app.use("/api/v1/auth", authRouter);

// .............middlewares......................
app.use(errorHandlerMiddleware);

// ...............server...................
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const db = await connectDB(process.env.MONGO_URI);
    console.log(db.connection.host);
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
