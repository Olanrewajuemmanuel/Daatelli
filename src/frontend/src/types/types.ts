import { FindingsBadge, RegisterType } from "./enums";
import { InferType } from "yup";
import {
  attestationSchema,
  uploadAnalysisSchema,
  uploadFileSchema,
  uploadFindingsSchema,
} from "../validations/schema/commons";

export type FormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type Message = {
  id: string;
  type?: "danger" | "warning" | "success";
  message: string;
};

export type RegistrationData = {
  name: string;
  email: string;
  field: string;
  interests: {
    value: string;
    label: string;
  }[];
  researcherType: string;
  institution: string;
  affiliations: string;
  refs: string;
  password1: string;
  password2: string;
};

export type User = {
  id: string;
  full_name: string;
  role: RegisterType;
  email: string;
  onboarded: boolean;
  avatar: string;
  // ...
};

export type SuggestionItem = {
  id: string;
  avatarUrl?: string;
  name: string;
};

export type Citation = {
  id: string;
  name: string;
  link: string;
};

export type Findings = {
  id: string;
  badge: FindingsBadge;
  text: string;
  citations?: Citation[];
};

export type UploadFileSchemaType = InferType<typeof uploadFileSchema>;
export type MultiMediaFileSchemaType = InferType<typeof uploadFileSchema>;
export type UploadFindingSchemaType = InferType<typeof uploadFindingsSchema>;
export type UploadAnalysisSchemaType = InferType<typeof uploadAnalysisSchema>;
export type AttestationSchemaType = InferType<typeof attestationSchema>;
export type DocumentFormSchemaType =
  | UploadFileSchemaType
  | UploadFindingSchemaType
  | UploadAnalysisSchemaType
  | AttestationSchemaType;

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
export type MultiMediaFormType =
  | MultiMediaFileSchemaType
  | UploadFindingSchemaType
  | AttestationSchemaType;

export type ResearchPost = Record<any, any>