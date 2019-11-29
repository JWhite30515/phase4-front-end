import IAccountState, { initialAccountState } from './AccountState';
import IUserState, { initialUserState } from './UserState';
import ICompanyState, { initialCompanyState } from './CompanyState';
import ITheaterState, { initialTheaterState } from './TheaterState';

export default interface IRootState {
  accountState: IAccountState;
  companyState: ICompanyState;
  userState: IUserState;
  theaterState: ITheaterState;
}

export const initialState = {
  accountState: initialAccountState,
  companyState: initialCompanyState,
  userState: initialUserState,
  theaterState: initialTheaterState,
}

