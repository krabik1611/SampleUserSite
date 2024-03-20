import React, {createContext, FC} from "react";
import {UserContextType} from "../types/user";

// export const UserContext = createContext<UserContextType>({
//   user: null,
//   saveUser: (user) => {},
// });
export const UserContext = createContext<UserContextType | null>(null);

type IProps = UserContextType & {
  children: React.ReactNode;
};

export const UserProvider: FC<IProps> = ({ user, saveUser, children }) => {
  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
