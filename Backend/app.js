const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Load .env FIRST (absolute path so it works regardless of where you run the command)
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectToDb = require("./db/db");
connectToDb();

const app = express();

// CORS — must be before routes. credentials:true is REQUIRED for cookies
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // CRA or Vite
    credentials: true,
  })
);

// Logger
app.use(logger("tiny"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookies (enough to read/write JWT cookies — express-session removed, it was unused)
app.use(cookieParser());

// Routes
app.use("/", require("./routes/userRoutes"));
app.use("/task", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});