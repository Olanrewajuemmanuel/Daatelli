import { getURL, serverRoutes } from "../constants";
import { User } from "../types/types";
import { axiosPrivateClient } from "./config";

export async function getUserProfile(accessToken: string): Promise<User> {
  // make API call
  try {
    const response = await axiosPrivateClient(accessToken, null).get(
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
  accessToken: string,
  options?: { association: boolean; limit?: number }
) {
  // Mimic API server response
  try {
    const response = await axiosPrivateClient(accessToken, null).get(
      `${getURL(serverRoutes.associations as keyof typeof serverRoutes)}?association=${options?.association}&limit=${options?.limit || 5}`
    );

    return await response.data;
  } catch (error) {
    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}
