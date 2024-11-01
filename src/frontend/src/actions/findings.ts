import { getURL, serverRoutes } from "../constants";
import { DocumentFormSchemaType } from "../types/types";
import { axiosPrivateClient } from "./config";

function _transformFindingData(finding: Record<string, any>) {
  return {
    ...finding,
    doi_or_link: finding?.doiOrLink,
    domain_of_research: finding?.domainOfResearch,
    private_copy: finding?.privateCopy,
    analysis_type: finding?.type,
    files: [...finding?.files].map((file: Record<string, any>) => file.name),
    researchers: finding?.researchers.map((researcher: Record<string, any>) => researcher.id),
    tags: finding?.tags ? finding?.tags.map((tag: Record<string, any>) => tag.value) : null,
  }
}

export async function createFinding(
  finding: DocumentFormSchemaType,
) {

  try {
    const response = await axiosPrivateClient.post(
      getURL(serverRoutes.userFindings as keyof typeof serverRoutes),
      _transformFindingData(finding)
    );

    return await response.data;
  } catch (error) {
    console.log(error);

    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}

export async function getFinding(id: string) {
  try {
    const response = await axiosPrivateClient.get(`${getURL(serverRoutes.userFindings as keyof typeof serverRoutes)}/${id}`)
    return await response.data;
  } catch (error) {
    console.log(error);

    return Promise.reject(
      (error as Error) || Error("An unexpected error occurred")
    );
  }
}

