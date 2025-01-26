import express from "express";
import tokenService from "./services/token.service";
import { LoginRequest } from "./types/auth.types";

export const app = express();
app.use(express.json());

app.post("/api/token", async (req, res) => {
  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (
    email !== process.env.VALID_EMAIL ||
    password !== process.env.VALID_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const token = await tokenService.getToken();
    res.json({ access_token: token });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});
