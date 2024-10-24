import { request } from "@/utils/service";
import type * as Login from "./types/login";

/** Login and return Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.UserLoginResponseData>({
    url: "user/signin",
    method: "post",
    data,
  });
}

/** Get user details */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "user/userLoginInfo",
    method: "get",
  });
}

/** Get user Refresh Token */
export function getRefreshToken() {
  return request<Login.RefreshTokenResponseData>({
    url: "user/refresh-token",
    method: "post",
  });
}
