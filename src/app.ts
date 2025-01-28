import express from "express";
import cors from "cors";
import venlyRoutes from "./routes/venly.routes";
import tokenService from "./services/token.service";
import { LoginRequest } from "./types/auth.types";

export const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*", // Or specify your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Pre-flight requests
app.options("*", cors());

// Auth endpoint
app.post("/api/token", async (req: express.Request, res: express.Response) => {
  console.log("Auth request received:", req.body);
  console.log("Request headers:", req.headers);

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

    // Set CORS headers explicitly
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept"
    );

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

// Handle 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Not found" });
});
