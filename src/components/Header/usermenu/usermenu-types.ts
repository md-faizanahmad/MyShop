// // src/components/user-menu/types.ts
// export type UserType = {
//   id?: string;
//   name?: string;
//   email?: string;
//   isLoggedIn?: boolean;
//   // add other fields your auth provides
// };
// // src/components/user-menu/usermenu-types.ts
// export type UserMenuUser = {
//   _id?: string;
//   name?: string | null;
//   email?: string | null;
//   avatarUrl?: string | null;
// };
// src/components/user-menu/usermenu-types.ts
import type { PublicUser } from "../../../types/user";

export type UserMenuUser = {
  _id?: string;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null; // optional if you add later
};

export type UserType = PublicUser;
