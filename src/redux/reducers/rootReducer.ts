import { combineReducers, AnyAction, Reducer } from 'redux';

import IAccountState, { initialAccountState } from '../state/AccountState';
import ICompanyState, { initialCompanyState } from '../state/CompanyState';
import ITheaterState, { initialTheaterState } from '../state/TheaterState';
import IUserState, { initialUserState } from '../state/UserState';
import IRootState from '../state/RootState';

import { keys } from '../../constants/keys';

const accountReducer: Reducer<IAccountState, AnyAction> = (
  state = initialAccountState,
  action
): IAccountState => {
  switch (action.type) {
    case keys.AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        userType: action.userType,
        isAuthenticated: true,
      };
    case keys.AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

const userReducer: Reducer<IUserState, AnyAction> = (
  state = initialUserState,
  action
): IUserState => {
  switch (action.type) {
    case keys.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
      }
    default:
      return state;
  }
}

const companyReducer: Reducer<ICompanyState, AnyAction> = (
  state = initialCompanyState,
  action
): ICompanyState => {
  switch (action.type) {
    case keys.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.companies,
      }
    case keys.GET_COMPANY_DETAIL_SUCCESS:
      return {
        ...state,
        company: action.companyDetail,
      }
    default:
      return state;
  }
}

const theaterReducer: Reducer<ITheaterState, AnyAction> = (
  state = initialTheaterState,
  action
): ITheaterState => {
  switch (action.type) {
    case keys.GET_VALID_MANAGERS_SUCCESS:
      return {
        ...state,
        validManagers: action.validManagers
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers<IRootState>({
  accountState: accountReducer,
  companyState: companyReducer,
  userState: userReducer,
  theaterState: theaterReducer,
});

export default rootReducer;
