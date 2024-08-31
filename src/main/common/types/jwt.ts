export type JwtPayloadType = {
  refreshKey: string;
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
