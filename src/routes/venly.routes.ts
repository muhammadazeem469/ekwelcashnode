import express from "express";
import contractService from "../services/contract.service";
import tokenMintingService from "../services/token-minting.service";

const router = express.Router();

// Contract Routes
router.post("/contracts/deployments", async (req, res) => {
  console.log("Contract deployment request received:", req.body);
  try {
    const result = await contractService.deployContract(req.body);
    console.log("Contract deployment successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Contract deployment error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.get("/contracts/deployments/:deploymentId", async (req, res) => {
  console.log("Contract status check request for:", req.params.deploymentId);
  try {
    const result = await contractService.checkDeploymentStatus(
      req.params.deploymentId
    );
    console.log("Contract status check successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Contract status check error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Token Routes
router.post("/token-types/creations", async (req, res) => {
  console.log("Token type creation request received:", req.body);
  try {
    const result = await tokenMintingService.createTokenType(req.body);
    console.log("Token type creation successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Token type creation error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.get("/token-types/creations/:creationId", async (req, res) => {
  console.log("Token type status check request for:", req.params.creationId);
  try {
    const result = await tokenMintingService.checkTokenCreationStatus(
      req.params.creationId
    );
    console.log("Token type status check successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Token type status check error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.post("/tokens/mints", async (req, res) => {
  console.log("Token minting request received:", req.body);
  try {
    const result = await tokenMintingService.mintTokens(req.body);
    console.log("Token minting successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Token minting error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.get("/tokens/mints/:mintId", async (req, res) => {
  console.log("Token mint status check request for:", req.params.mintId);
  try {
    const result = await tokenMintingService.checkMintStatus(req.params.mintId);
    console.log("Token mint status check successful:", result);
    res.json(result);
  } catch (error) {
    console.error("Token mint status check error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
