import express, { NextFunction, Request, Response } from "express";
import { faker } from "./public/Faker";
import { listOf, List } from "./public/List";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (_: Request, res: Response) => {
  res.send("Hello");
});

app.get("/random/users/:quantity", (req: Request, res: Response) => {
  const users = listOf();
  for (let i = 0; i < Number(req.params.quantity); i++) {
    users.push(faker.user());
  }
  return res.json(users);
});

app.get("/random/integers/:integers", (req: Request, res: Response) => {
  const num = Number(req.params.integers);
  const integers = List.generateRandomIntegers(
    num,
    req.query.min,
    req.query.max
  );
  return res.json(integers);
});

app.get("/random/user", (req, res, next) => {
  return res.json(faker.user());
});

app.listen(port, () => console.log("Server listening on port", port));
