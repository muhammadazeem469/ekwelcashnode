// src/services/token-minting.service.ts

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
        {
          ...creationData,
          creations: creationData.creations.map((creation) => ({
            ...creation,
            imagePreview: creation.image,
            imageThumbnail: creation.image,
          })),
        },
        { headers }
      );

      // Ensure all image fields are present in the response
      const enrichedResponse = this.enrichImageFields(response.data);
      return enrichedResponse;
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
      return this.enrichImageFields(response.data);
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
      return this.enrichImageFields(response.data);
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

  public async checkMintStatus(mintId: string): Promise<TokenMintResponse> {
    try {
      const headers = await this.getHeaders();
      const response = await axios.get<TokenMintResponse>(
        `${this.baseUrl}/tokens/mints/${mintId}`,
        { headers }
      );
      return this.enrichImageFields(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Mint status check failed: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }

  private enrichImageFields<T extends { result: any }>(response: T): T {
    if (response?.result?.metadata?.contract) {
      const contract = response.result.metadata.contract;
      if (contract.image && !contract.imageUrl) {
        contract.imageUrl = contract.image;
        contract.image_url = contract.image;
      }
    }

    if (response?.result?.metadata) {
      const metadata = response.result.metadata;
      if (metadata.image && !metadata.imagePreview) {
        metadata.imagePreview = metadata.image;
        metadata.imageThumbnail = metadata.image;
      }
    }

    return response;
  }
}

export default new TokenMintingService();
