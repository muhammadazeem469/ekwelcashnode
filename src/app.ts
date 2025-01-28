import express from "express";
import cors from "cors";
import venlyRoutes from "./routes/venly.routes";
import tokenService from "./services/token.service";
import { LoginRequest } from "./types/auth.types";

export const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Auth endpoint
app.post("/api/token", async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  if (
    email !== process.env.VALID_EMAIL ||
    password !== process.env.VALID_PASSWORD
  ) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
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

// Venly API routes
app.use("/api/venly", venlyRoutes);
