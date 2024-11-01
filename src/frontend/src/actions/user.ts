import { getURL, serverRoutes } from "../constants";
import { User } from "../types/types";
import { axiosPrivateClient } from "./config";

export async function getUserProfile(): Promise<User> {
  // make API call
  try {
    const response = await axiosPrivateClient.get(
      getURL(serverRoutes.me as keyof typeof serverRoutes)
    );
    return await response.data;
  } catch (error) {
    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}

export async function getUserAssociations(
  options?: { association: boolean; limit?: number }
) {
  // Mimic API server response
  try {
    const response = await axiosPrivateClient.get(
      `${getURL(serverRoutes.associations as keyof typeof serverRoutes)}?association=${options?.association}&limit=${options?.limit || 5}`
    );

    return await response.data;
  } catch (error) {
    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}
