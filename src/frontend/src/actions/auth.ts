import { getURL, serverRoutes } from "../constants";
import { LoginResponse } from "../types/types";
import { axiosPublicClient } from "./config";

export const loginUser = async (
  password: string,
  email?: string,
  userId?: string,
  username?: string
) => {
  if (!email && !username && !userId) {
    return Promise.reject(Error("UID not provided"));
  }
  let accessToken = null;
  let refreshToken = null;
  if (email) {
    try {
      const response = await axiosPublicClient.post(
        `${getURL(serverRoutes.login)}?user=${username}`
      );
      const data: LoginResponse = await response.data;
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
    } catch (err) {
      return Promise.reject((err as Error) || "An unexpected error occurred");
    }
  } else {
    // logic for other login types
  }

  return Promise.resolve({
    accessToken,
    refreshToken,
  });
};

export const logoutUser = async (accessToken: string) => {
  try {
    return await axiosPublicClient.post(getURL(serverRoutes.logout), "", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (err) {
    return Promise.reject((err as Error) || "An unexpected error occurred");
  }
};

export const sendResetPasswordRequest = async (uid: string) => {
  setTimeout(() => uid, 3000); // mimic async server fn
  return Promise.resolve({
    message:
      "Instructions to reset your password has been sent to the provided email",
  });
};

export const sendResetPasswordConfirmation = async (
  token: string,
  oldPassword: string,
  newPassword: string
) => {
  setTimeout(() => ({ token, oldPassword, newPassword }), 3000); // mimic async server fn
  return Promise.resolve({
    message: "Your password has been successfully changed",
  });
};
