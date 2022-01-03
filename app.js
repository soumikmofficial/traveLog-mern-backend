require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// other imports
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const pinRouter = require("./routes/pinRoutes");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// packages
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.static("./public"));
app.use(express.json());

// .............routes.............
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pins", pinRouter);

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
