export interface IUser {
  id: number;
  username: string;
  password?: string;
  updatedAt: string;
  createdAt: string;

  [key: string]: any;
}

export type UserContextType = {
  user: IUser | null;
  saveUser: (user: IUser) => void;
};
