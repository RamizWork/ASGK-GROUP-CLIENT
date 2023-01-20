export interface TokensInterface {
  identifier: string;
  token: string;
  status: boolean;
}

export interface AuthorizationInterface {
  limit: number;
  tokens: TokensInterface[];
}
