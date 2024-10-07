import { Message } from "../types/types";

export const bannerMessages: Message[] = [];

export function bannerMessagesReducer(
  state: Message[],
  action: {
    type: "ADD" | "DELETE" | "DELETE_ALL";
    message?: Message;
    id?: string;
  }
): Message[] {
  switch (action.type) {
    case "ADD":
      if (!action.message) return state;
      return [...state, action.message];
    case "DELETE":
      return state.filter((message) => message.id !== action?.id);
    case "DELETE_ALL":
      return [];
    default:
      return state;
  }
}
