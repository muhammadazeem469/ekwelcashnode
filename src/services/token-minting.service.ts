import axios from "axios";
import {
  TokenCreationRequest,
  TokenCreationResponse,
  TokenCreationStatusResponse,
  TokenMintRequest,
  TokenMintResponse,
} from "../types/venly.types";
import tokenService from "./token.service";

class TokenMintingService {
  private baseUrl = "https://token-api.venly.io/api/v3/erc1155";

  private async getHeaders() {
    const token = await tokenService.getToken();
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  public async createTokenType(
    creationData: TokenCreationRequest
  ): Promise<TokenCreationResponse> {
    try {
      const headers = await this.getHeaders();
      const response = await axios.post<TokenCreationResponse>(
        `${this.baseUrl}/token-types/creations`,
        creationData,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Token type creation failed: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }

  public async checkTokenCreationStatus(
    creationId: string
  ): Promise<TokenCreationStatusResponse> {
    try {
      const headers = await this.getHeaders();
      const response = await axios.get<TokenCreationStatusResponse>(
        `${this.baseUrl}/token-types/creations/${creationId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Creation status check failed: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }

  public async mintTokens(
    mintData: TokenMintRequest
  ): Promise<TokenMintResponse> {
    try {
      const headers = await this.getHeaders();
      const response = await axios.post<TokenMintResponse>(
        `${this.baseUrl}/tokens/mints`,
        mintData,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Token minting failed: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }
}

export default new TokenMintingService();
