import React from "react";
import { IVendor } from "../types/vendor.types";

export interface IUserContext extends IVendor {
  token?: string;
  isAdmin?: boolean;
}
export type TWishlistReord = Record<string, boolean>;

export const UserContext = React.createContext<{
  user: IUserContext;
  setUser: React.Dispatch<React.SetStateAction<IUserContext>>;
}>({
  user: {},
  setUser: () => null,
});
