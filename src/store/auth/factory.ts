import { requests } from "@/utils/Api";

const factories = {
  registerFinal: (data) => {
    return requests().post("/auth/register-final", { data });
  },
  registerConfirm: (data) => {
    return requests().post("/auth/register-confirm", { data });
  },
  register: (data) => {
    return requests().post("/auth/register", { data });
  },
  login: (data) => {
    return requests().post("/auth/login", { data });
  },
  me: () => {
    return requests().get("/auth/me");
  },
  forgotPassword: (data) => {
    return requests().post("/auth/forgot-password", { data });
  },
  checkResetPasswordToken: (token) => {
    return requests().get(`/auth/reset-password/${token}/check`);
  },
  resetPassword: (data) => {
    return requests().put("/auth/reset-password", { data });
  },
  refreshToken: (data) => {
    return requests().post("/auth/refresh-token", { data });
  },
  submitOtp: (data) => {
    return requests().post("/users/otp", { data });
  },
};

export default factories;
