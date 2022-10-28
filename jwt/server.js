import express from "express";
import { router } from "./routes.js";
import jwt from "jsonwebtoken";

const app = express();

const PORT = process.env.PORT || 8080;
const APP_SECRET = process.env.APP_SECRET || "banana";


app.use(express.json());

app.use((req, _res, next) => {
  const { headers } = req;

  if (
    headers &&
    headers.authorization &&
    headers.authorization.split(" ")[0] === "Bearer"
  ) {

    jwt.verify(headers.authorization.split(" ")[1], APP_SECRET, (err, decode) => {
      console.log({err, decode})
      if (err) {
        req.authorization = null;
      }

      req.authorization = decode;
      next();
    });
  } else {
    req.authorization = null;
    next();
  }
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
