const express = require("express");
const { faker } = require("./public/Faker");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.get("/users/random", (req, res, next) => {
  res.json(faker.user());
});

app.listen(port, () => console.log("Server listening on port", port));
