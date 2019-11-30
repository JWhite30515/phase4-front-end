import IAccountState, { initialAccountState } from './AccountState';
import IUserState, { initialUserState } from './UserState';
import ICompanyState, { initialCompanyState } from './CompanyState';
import ITheaterState, { initialTheaterState } from './TheaterState';
import IMovieState, { initialMovieState } from './MovieState';

export default interface IRootState {
  accountState: IAccountState;
  companyState: ICompanyState;
  userState: IUserState;
  theaterState: ITheaterState;
  movieState: IMovieState;
}

export const initialState = {
  accountState: initialAccountState,
  companyState: initialCompanyState,
  userState: initialUserState,
  theaterState: initialTheaterState,
  movieState: initialMovieState,
}

