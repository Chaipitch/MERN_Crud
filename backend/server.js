const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the iSupport" });
});

//Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

//serve Frontend
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname),
      "../",
      "frontend",
      "build",
      "index.html"
    )
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the iSupport" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
