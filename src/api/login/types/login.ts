export interface LoginRequestData {
  email: string;
  password: string;
}

export type LoginResponseData = ApiResponseData<{ token: string }>;

export type UserInfoResponseData = ApiResponseData<{
  username: string;
  roles: string[];
}>;

export type UserLoginResponseData = ApiResponseData<{
  user: {
    id: number;
    email: string;
  };
  acessToken: string;
  refreshToken: string;
}>;

export type RefreshTokenResponseData = ApiResponseData<{
  acessToken: string;
  refreshToken: string;
}>;
