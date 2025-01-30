// Contract Types
export interface ContractDeploymentRequest {
  name: string;
  description: string;
  image: string;
  externalUrl: string;
  chain: string;
}

export interface ContractDeploymentResponse {
  success: boolean;
  result: {
    name: string;
    description: string;
    id: string;
    address?: string; // Added this
    chain: string;
    symbol: string;
    externalUrl: string;
    image: string;
    imageUrl: string; // Added this
    image_url: string; // Added this
    media: any[];
    transactionHash: string;
    status: string;
    storage: {
      type: string;
      location: string;
    };
    contractUri: string;
    royalties: Record<string, any>;
    external_link: string;
  };
}

// Token Creation Types
export interface TokenCreationRequest {
  chain: string;
  contractAddress: string;
  creations: Array<{
    name: string;
    description: string;
    image: string;
  }>;
}

interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  imagePreview: string;
  imageThumbnail: string;
  animationUrls: any[];
  attributes: Array<{
    type: string;
    name: string;
    value: string;
    traitType: string;
    trait_type: string;
  }>;
  contract: {
    address: string;
    name: string;
    symbol: string;
    image: string;
    imageUrl: string;
    image_url: string;
    description: string;
    externalLink: string;
    external_link: string;
    externalUrl: string;
    external_url: string;
    media: any[];
    type: string;
  };
  fungible: boolean;
}

export interface TokenCreationResponse {
  success: boolean;
  result: {
    creations: Array<{
      id: string;
      status: string;
      tokenTypeId: number;
      metadata: TokenMetadata;
    }>;
  };
}

// Token Minting Types
export interface TokenMintRequest {
  contractAddress: string;
  chain: string;
  tokenTypeId: string;
  destinations: Array<{
    address: string;
    amount: number;
  }>;
}

export interface TokenMintResponse {
  success: boolean;
  result: {
    mints: Array<{
      id: string;
      createdOn: string;
      status: string;
      destination: {
        address: string;
        amount: number;
      };
    }>;
    metadata: TokenMetadata;
  };
}

// Status Check Response Types
export interface ContractStatusResponse {
  success: boolean;
  result: Omit<ContractDeploymentResponse["result"], "address"> & {
    address: string; // Making address required in status response
  };
}

export interface TokenCreationStatusResponse {
  success: boolean;
  result: {
    id: string;
    status: string;
    transactionHash: string;
    tokenTypeId: number;
    mints: any[];
    metadata: TokenMetadata;
  };
}
