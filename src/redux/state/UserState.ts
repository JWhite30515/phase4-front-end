import { UserType } from "./AccountState";
import { ITheater } from "./CompanyState";
import { ILogVisit } from "../actions/userActions";

export default interface IUserState {
  users: IUserTableEntry[];
  theaters: ITheater[];
  visits: ILogVisit[];
}

export const initialUserState: IUserState = {
  users: [],
  theaters: [],
  visits: [],
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

export interface ICreditCard {
  creditCardNum: string;
}