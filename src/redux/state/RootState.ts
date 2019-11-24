import IAccountState, { initialAccountState } from './AccountState';

export default interface IRootState {
  accountState: IAccountState;
}

export const initialState = {
  accountState: initialAccountState,
}

