import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
