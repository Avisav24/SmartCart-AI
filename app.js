const express = require("express");
const app = express();
const apiRoutes = require("./routes/api"); // ✅ Correct path

app.use(express.json()); // Optional but useful if parsing JSON bodies

app.use("/api", apiRoutes); // Mounts the route at /api
require("./database/mongo"); // or correct path to mongo.js


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
