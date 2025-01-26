import axios from "axios";
import { TokenResponse } from "../types/auth.types";
import { config } from "../config/config";

class TokenService {
  private async getVenlyToken(): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", config.venlyAuth.clientId);
    params.append("client_secret", config.venlyAuth.clientSecret);

    try {
      const response = await axios.post<TokenResponse>(
        config.venlyAuth.url,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", {
          response: error.response?.data,
          status: error.response?.status,
          message: error.message,
        });
        throw new Error(
          `Failed to fetch token: ${JSON.stringify(
            error.response?.data || error.message
          )}`
        );
      }
      throw error;
    }
  }

  public async getToken(): Promise<string> {
    const tokenResponse = await this.getVenlyToken();
    return tokenResponse.access_token;
  }
}

export default new TokenService();
