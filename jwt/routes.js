import { Router } from "express";
import jwt from "jsonwebtoken";
import { protectedRoute } from "./middlewares.js";

const router = Router();

const APP_SECRET = process.env.APP_SECRET || "banana";

router.get("/", (_req, res) => {
  res.send("No Auth Needed");
});

router.post("/auth", (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    res.status(401).json({ messge: `Authentication failed` });
    return;
  }

  res.json({ token: jwt.sign({ email, name }, APP_SECRET) });
});

router.get("/admin", protectedRoute, (req, res) => {
  const { name } = req.authorization;
  res.send(`Hello, ${name}`);
});

export { router };
