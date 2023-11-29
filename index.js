const express = require("express");
const { faker } = require("./public/Faker");
const { listOf, List } = require("./public/List");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.get("/random/users/:quantity", (req, res, next) => {
  const users = listOf();
  for (let i = 0; i < req.params.quantity; i++) {
    users.push(faker.user());
  }
  return res.json(users);
});

app.get("/random/integers/:integers", (req, res, next) => {
  const num = Number(req.params.integers);
  console.log(num);
  const integers = List.generateRandomIntegers(
    num,
    req.query.min,
    req.query.max
  );
  console.log(integers);
  return res.json(integers);
});

app.get("/random/user", (req, res, next) => {
  return res.json(faker.user());
});

app.listen(port, () => console.log("Server listening on port", port));
