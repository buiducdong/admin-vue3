import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import {
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "@/utils/cache/cookies";
import { resetRouter } from "@/router";
import { loginApi, getUserInfoApi } from "@/api/login";
import { type LoginRequestData } from "@/api/login/types/login";
import routeSettings from "@/config/route";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const username = ref<string>("");

  /** Log in */
  const login = async ({ email, password }: LoginRequestData) => {
    const { data } = await loginApi({ email, password });
    setToken(data.acessToken);
    setRefreshToken(data.refreshToken);
    token.value = data.acessToken;
  };
  /** Get user details */
  const getInfo = async () => {
    const { data } = await getUserInfoApi();
    username.value = data.username.split("@")[0];
    // // Verify that the returned roles is a non-empty array. Otherwise, insert a default role that has no effect to prevent the routing guard logic from entering an infinite loop.
    roles.value =
      data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles;
  };
  /** Simulating role changes */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role;
    token.value = newToken;
    setToken(newToken);
    // Refresh the page instead of logging in again
    window.location.reload();
  };
  /** Sign out */
  const logout = () => {
    removeToken();
    removeRefreshToken();
    token.value = "";
    roles.value = [];
    resetRouter();
  };
  /** Reset Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
    roles.value = [];
  };

  return {
    token,
    roles,
    username,
    login,
    getInfo,
    changeRoles,
    logout,
    resetToken,
  };
});

/**Use outside of setup */
export function useUserStoreHook() {
  return useUserStore(store);
}
