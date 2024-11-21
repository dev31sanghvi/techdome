const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const loanRoutes = require('./routes/loanRoutes');
// const authRoutes = require('./routes/auth');
const app = express();

// Middleware it is
app.use(express.json());
app.use(cors());

app.use('/api',loanRoutes);
app.use("/loans",loanRoutes)


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//  routes
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));