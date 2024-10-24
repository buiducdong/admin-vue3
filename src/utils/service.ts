import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { get, merge } from "lodash-es";
import { getRefreshToken, getToken, setToken } from "./cache/cookies";

/** Log out and force refresh the page (will redirect to the login page) */
function logout() {
  useUserStoreHook().logout();
  location.reload();
}
/** get Refresh Token */
const getRefreshTokenApi = async () => {
  const refreshToken = getRefreshToken();
  const response = await axios.post(
    `${process.env.VUE_APP_BASE_API}user/refresh-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  const newToken = response.data.acessToken;
  setToken(newToken);
};

/** Create a request instance */
function createService() {
  // Create an axios instance named service
  const service = axios.create();
  // Request interception
  service.interceptors.request.use(
    (config) => config,
    // Send failed
    (error) => Promise.reject(error)
  );
  // Response interception (can be adjusted according to specific business)
  service.interceptors.response.use(
    (response) => response,
    (error) => {
      // status is the HTTP status code
      const status = get(error, "response.status");
      switch (status) {
        case 400:
          if (error.response?.data?.errors?.message) {
            error.message = error.response?.data?.errors?.message;
          } else {
            error.message = "Request Error";
          }
          break;
        case 401:
          // When the token expires
          try {
            getRefreshTokenApi();
            const config = error.config;
            config.headers.Authorization = `Bearer ${getToken()}`;
            useUserStoreHook().token = getToken() || "";
            return service(config);
          } catch (error) {
            logout();
          }
          break;
        case 403:
          error.message = "Access denied";
          break;
        case 404:
          error.message = "Request address error";
          break;
        case 408:
          error.message = "Request timeout";
          break;
        case 500:
          error.message = "Internal server error";
          break;
        case 504:
          error.message = "Gateway timeout";
          break;
        default:
          break;
      }
      ElMessage.error(error.message);
      return Promise.reject(error);
    }
  );
  return service;
}

/** Create a request method */
function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken();
    const defaultConfig = {
      headers: {
        // Carrying Token
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      timeout: 5000,
      baseURL: process.env.VUE_APP_BASE_API,
      data: {},
    };
    // Merge the default configuration defaultConfig and the passed custom configuration config into mergeConfig
    const mergeConfig = merge(defaultConfig, config);
    return service(mergeConfig);
  };
}

/** Instances used for network requests */
const service = createService();
/** Methods used for network requests */
export const request = createRequest(service);
