export interface AuthRequest extends Request {
  company: {
    sub: number;
    iat: number;
    exp: number;
  };
}
