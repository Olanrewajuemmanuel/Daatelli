import { serverRoutes } from "../constants";
import { DocumentFormSchemaType } from "../types/types";
import { axiosPrivateClient } from "./config";

export async function createFinding(
  finding: DocumentFormSchemaType,
  accessToken: string
) {
  try {
    const response = await axiosPrivateClient(accessToken, finding).post(
      serverRoutes.userFindings
    );
    return await response.data;
  } catch (error) {
    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}
