import React from "react";

export interface IUserContext {
  token?: string;
}
export type TWishlistReord = Record<string, boolean>;

export const UserContext = React.createContext<{
  user: IUserContext;
  setUser: React.Dispatch<React.SetStateAction<IUserContext>>;
}>({
  user: {},
  setUser: () => null,
});
