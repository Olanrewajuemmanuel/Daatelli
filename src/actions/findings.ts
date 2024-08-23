import { FindingsBadge } from "../types/enums";
import { DocumentFormSchemaType, Findings } from "../types/types";

const exampleFindingResponse = {
  id: "1234",
  findings: <Findings[]>[
    {
      id: "12",
      badge: FindingsBadge.correlations,
      text: "A finding text",
    },
    {
      id: "345",
      badge: FindingsBadge.significant,
      text: "Another finding text",
    },
  ],
  creator: "John Doe",
};

export async function createFinding(
  finding: DocumentFormSchemaType,
  accessToken: string
) {
  if (!accessToken) return Promise.reject("Invalid token provided");
  return Promise.resolve(exampleFindingResponse);
}
