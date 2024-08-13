import { RegisterType } from "../types/enums";
import { User } from "../types/types";

export async function getUserProfile(accessToken: string): Promise<User> {
  // make API call
  if (!accessToken) return Promise.reject("Access token is invalid");
  return Promise.resolve({
    id: "1",
    role: RegisterType.researcher,
    fullName: "John Doe",
    email: "email@example.com",
    onBoarded: false,
  });
}
