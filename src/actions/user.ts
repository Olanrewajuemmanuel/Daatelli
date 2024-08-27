import { serverRoutes } from "../constants";
import { RegisterType } from "../types/enums";
import { User } from "../types/types";
import { axiosPrivateClient } from "./config";

export async function getUserProfile(accessToken: string): Promise<User> {
  // make API call
  try {
    const response = await axiosPrivateClient(accessToken, null).post(
      serverRoutes.register
    );
    return await response.data;
  } catch (error) {
    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}

export async function getUsers(
  accessToken: string,
  options?: { type: "fullName" | "role"; limit: 100 }
) {
  // Mimic API server response
  try {
    const response = await axiosPrivateClient(accessToken, null).post(
      serverRoutes.userProfiles
    );

    return await response.data;
  } catch (error) {
    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}
