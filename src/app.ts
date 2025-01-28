import express from "express";
import cors from "cors";
import venlyRoutes from "./routes/venly.routes";
import tokenService from "./services/token.service";
import { LoginRequest } from "./types/auth.types";

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

// Auth endpoint
app.post("/api/token", async (req: express.Request, res: express.Response) => {
  console.log("Auth request received:", req.body); // Add logging

  const { email, password } = req.body as LoginRequest;

  if (!email || !password) {
    console.log("Missing credentials");
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  if (
    email !== process.env.VALID_EMAIL ||
    password !== process.env.VALID_PASSWORD
  ) {
    console.log("Invalid credentials");
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  try {
    const token = await tokenService.getToken();
    console.log("Token generated successfully");
    res.json({ access_token: token });
  } catch (error) {
    console.error("Token generation error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Venly API routes
app.use("/api/venly", venlyRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
);
