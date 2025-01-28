import express from "express";
import contractService from "../services/contract.service";
import tokenMintingService from "../services/token-minting.service";

const router = express.Router();

// Contract Routes
router.post("/contracts/deployments", async (req, res) => {
  try {
    const result = await contractService.deployContract(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.get("/contracts/deployments/:deploymentId", async (req, res) => {
  try {
    const result = await contractService.checkDeploymentStatus(
      req.params.deploymentId
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// Token Routes
router.post("/token-types/creations", async (req, res) => {
  try {
    const result = await tokenMintingService.createTokenType(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.get("/token-types/creations/:creationId", async (req, res) => {
  try {
    const result = await tokenMintingService.checkTokenCreationStatus(
      req.params.creationId
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

router.post("/tokens/mints", async (req, res) => {
  try {
    const result = await tokenMintingService.mintTokens(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
