require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// other imports
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const pinRouter = require("./routes/pinRoutes");
const errorHandlerMiddleware = require("./middleware/error-handler");

// packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//  security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

// ..................

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.static("./public"));

// ..........body parsers..............
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

// .............routes.............
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
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
