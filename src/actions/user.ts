import { RegisterType } from "../types/enums";
import { User } from "../types/types";

const profiles = [
  {
    id: "1",
    role: RegisterType.researcher,
    fullName: "John Doe",
    email: "email@example.com",
    onBoarded: false,
    avatarUrl:
      "https://c5.rgstatic.net/m/41010379691719/images/icons/svgicons/publication-creation-grey.svg",
  },
  {
    id: "123",
    role: RegisterType.researcher,
    fullName: "Bob Builder",
    email: "email@example.com",
    onBoarded: false,
    avatarUrl: "",
  },
  {
    id: "12",
    role: RegisterType.member,
    fullName: "Alice fasad",
    email: "alice@example.com",
    onBoarded: false,
    avatarUrl:
      "https://c5.rgstatic.net/m/41010379691719/images/icons/svgicons/publication-creation-grey.svg",
  },
];

export async function getUserProfile(accessToken: string): Promise<User> {
  // make API call
  if (!accessToken) return Promise.reject("Access token is invalid");
  return Promise.resolve({
    id: "1",
    role: RegisterType.researcher,
    fullName: "John Doe",
    email: "email@example.com",
    onBoarded: false,
    avatarUrl: "",
  });
}

export async function getUsers(
  accessToken: string,
  options?: { type: "fullName" | "role"; limit: 100 }
): Promise<User[]> {
  // Mimic API server response
  if (!accessToken) return Promise.reject("Invalid token");
  const response: User[] = profiles.slice(options?.limit);

  return Promise.resolve(response);
}
