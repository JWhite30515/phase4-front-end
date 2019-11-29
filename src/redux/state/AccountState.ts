
export default interface IAccountState {
  isAuthenticated: boolean;
  userType: UserType | null;
  user: IUser | null;
}

export const initialAccountState = {
  isAuthenticated: false,
  userType: null,
  user: null,
};

export enum UserType {
  manager = 'MANAGER',
  customer = 'CUSTOMER',
  user = 'USER',
  managerCustomer = 'MANAGER_CUSTOMER',
  admin = 'ADMIN',
  adminCustomer = 'ADMIN_CUSTOMER',
}

export interface IUser {
  readonly username: string;
  readonly password: string;
  readonly status: string;
  readonly firstname: string;
  readonly lastname: string;
}
