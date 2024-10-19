import { createContext } from "react";
import { User } from "../types/types";

export const UserContext = createContext<User | null>(null);
// Add more dev features
export const FeaturesContext = createContext<string[]>([]);
export const ThemeContext = createContext<string>('light');
