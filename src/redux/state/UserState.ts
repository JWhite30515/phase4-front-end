import { UserType } from "./AccountState";

export default interface IUserState {
  users: IUserTableEntry[];
}

export const initialUserState = {
  users: [],
}

export interface IUserTableEntry {
  creditCardCount: number;
  username: string;
  userStatus: UserStatus;
  userType: UserType;
}

export enum UserStatus {
  pending = 'Pending',
  declined = 'Declined',
  approved = 'Approved',
}