import { Router } from "express";
import { protectedRoute } from "./middlewares.js";
import bcrypt from "bcrypt";

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

  const sessionId = bcrypt.hashSync(email + name, 10);
  res.cookie("user", { email, name });
  res.cookie("sessionId", sessionId);
  res.json({sessionId});
});

router.get("/admin", protectedRoute, (req, res) => {
  const { name } = req.authorization;
  res.send(`Hello, ${name}`);
});

export { router };
