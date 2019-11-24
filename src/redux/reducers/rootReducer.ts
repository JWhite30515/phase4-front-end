import { combineReducers, AnyAction, Reducer } from 'redux';

import IAccountState, { initialAccountState } from '../state/AccountState';
import IRootState from '../state/RootState';

import { keys } from '../keys';

const accountReducer: Reducer<IAccountState, AnyAction> = (
  state = initialAccountState,
  action
): IAccountState => {
  switch (action.type) {
    case keys.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case keys.AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers<IRootState>({
  accountState: accountReducer,
});

export default rootReducer;
