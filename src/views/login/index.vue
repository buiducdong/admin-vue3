<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { type FormInstance, type FormRules } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { type LoginRequestData } from "@/api/login/types/login";
import Owl from "./components/Owl.vue";
import { useFocus } from "./hooks/useFocus";

const router = useRouter();
const { isFocus, handleBlur, handleFocus } = useFocus();

/** Reference to the login form element */
const loginFormRef = ref<FormInstance | null>(null);

/** Login button Loading */
const loading = ref(false);
/** Login form data */
const loginFormData: LoginRequestData = reactive({
  username: "admin",
  password: "admin123",
});
/** Login form validation rules */
const loginFormRules: FormRules = {
  username: [
    { required: true, message: "Please enter your username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter your password", trigger: "blur" },
    {
      min: 8,
      max: 16,
      message: "Length between 8 and 16 characters",
      trigger: "blur",
    },
  ],
};
/** Login Logic */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true;
      useUserStore()
        .login(loginFormData)
        .then(() => {
          router.push({ path: "/" });
        })
        .catch(() => {
          loginFormData.password = "";
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      console.error("Form validation failed", fields);
    }
  });
};
</script>

<template>
  <div class="login-container">
    <!-- <ThemeSwitch class="theme-switch" /> -->
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/logo.svg" />
      </div>
      <div class="content">
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="Username"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="Password"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            @click.prevent="handleLogin"
            >Login</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
