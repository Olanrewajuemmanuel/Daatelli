export type FormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type Message = {
  type: "danger" | "warning" | "success";
  message: string;
};

export type RegisterMemberData = {
  name: string;
  email: string;
  field: string;
  interests: {
    value: string;
    label: string;
  }[];
  refs: string;
  password1: string;
  password2: string;
};
