import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { get, merge } from "lodash-es";
import { getToken } from "./cache/cookies";

/** Log out and force refresh the page (will redirect to the login page) */
function logout() {
  useUserStoreHook().logout();
  location.reload();
}

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
    (response) => {
      // apiData is the data returned by the api
      const apiData = response.data;
      // Binary data is returned directly
      const responseType = response.request?.responseType;
      if (responseType === "blob" || responseType === "arraybuffer")
        return apiData;
      // This code is the business code agreed with the backend
      const code = apiData.code;
      // If there is no code, it means this is not the API developed by the project backend
      if (code === undefined) {
        ElMessage.error("Interfaces other than this system");
        return Promise.reject(new Error("Interfaces other than this system"));
      }
      switch (code) {
        case 0:
          // This system uses code === 0 to indicate no business errors.
          return apiData;
        case 401:
          // When the token expires
          return logout();
        default:
          // Not the correct code
          ElMessage.error(apiData.message || "Error");
          return Promise.reject(new Error("Error"));
      }
    },
    (error) => {
      // status is the HTTP status code
      const status = get(error, "response.status");
      switch (status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          // When the token expires
          logout();
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求地址出错";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP 版本不受支持";
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
      baseURL: "api",
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
