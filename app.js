const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const app = express();
connectDB();
dotenv.config();
const PORT = process.env.PORT;
const customerRoutes = require("./routes/customerRoutes");

app.use(express.json());
app.use("/customer", customerRoutes);

app.listen(PORT, () => {
  console.log(`App is working on ${PORT}`);
});
