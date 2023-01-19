const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Smart Contracts API Sandbox challenge" });
});

require("./routes/smartContract.routes.js")(app);

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
