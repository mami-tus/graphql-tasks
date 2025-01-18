export type Payload = {
  email: string;
  sub: number;
  iat: number; // トークンが作成された日時
  exp: number;
};
