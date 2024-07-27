export interface IJWTPayload {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  role: IJWTPayloadRole[];
  sub: string;
}

export interface IJWTPayloadRole {
  authority: string;
}
