import axios from "axios";
import {
  ContractDeploymentRequest,
  ContractDeploymentResponse,
  ContractStatusResponse,
} from "../types/venly.types";
import tokenService from "./token.service";

class ContractService {
  private baseUrl = "https://token-api.venly.io/api/v3/erc1155";

  private async getHeaders() {
    const token = await tokenService.getToken();
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  public async deployContract(
    contractData: ContractDeploymentRequest
  ): Promise<ContractDeploymentResponse> {
    try {
      const headers = await this.getHeaders();
      const response = await axios.post<ContractDeploymentResponse>(
        `${this.baseUrl}/contracts/deployments`,
        contractData,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Contract deployment failed: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }

  public async checkDeploymentStatus(
    deploymentId: string
  ): Promise<ContractStatusResponse> {
    try {
      const headers = await this.getHeaders();
      const response = await axios.get<ContractStatusResponse>(
        `${this.baseUrl}/contracts/deployments/${deploymentId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Status check failed: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }
}

export default new ContractService();
