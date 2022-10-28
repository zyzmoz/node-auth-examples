import express from "express";
import { router } from "./routes.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 8080;
const APP_SECRET = process.env.APP_SECRET || "banana";

app.use(express.json());

app.use(cookieParser(APP_SECRET));

app.use((req, res, next) => {
  const { cookies } = req;
  if (cookies && cookies.sessionId) {
    req.authorization = cookies.user;
    next();
  } 
  req.authorization = null;
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
