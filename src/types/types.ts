import { RegisterType } from "./enums";

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
  fullName: string;
  role: RegisterType;
  email: string;
  onBoarded: boolean;
  // ...
};
