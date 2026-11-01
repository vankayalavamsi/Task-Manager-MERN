const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Load environment variables
require("dotenv").config({
path: path.join(__dirname, ".env"),
});

const connectToDb = require("./db/db");

const app = express();

// CORS configuration
const corsOptions = {
origin: [
"http://localhost:3000",
"http://localhost:5173",
"https://task-manager-mern23.netlify.app",
],
methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
credentials: true,
};

// Middleware
app.use(cors(corsOptions));

app.use(logger("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Routes
app.use("/", require("./routes/userRoutes"));
app.use("/task", require("./routes/taskRoutes"));

// Homepage
app.get("/", (req, res) => {
res.status(200).json({
success: true,
message: "TaskFlow Backend is running successfully!",
});
});

// Start server after database connection
const PORT = process.env.PORT || 8080;

const startServer = async () => {
try {
await connectToDb();

app.listen(PORT, () => {
  console.log(`TaskFlow server running on port ${PORT}`);
});

} catch (error) {
console.error("Server startup failed:", error.message);
process.exit(1);
}
};

startServer();
