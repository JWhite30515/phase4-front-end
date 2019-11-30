import { combineReducers, AnyAction, Reducer } from 'redux';

import IAccountState, { initialAccountState } from '../state/AccountState';
import ICompanyState, { initialCompanyState } from '../state/CompanyState';
import IMovieState, { initialMovieState } from '../state/MovieState';
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
        creditCards: action.creditCards,
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
    case keys.GET_THEATERS_SUCCESS:
      return {
        ...state,
        theaters: action.theaters,
      }
    case keys.GET_VISITS_SUCCESS:
      return {
        ...state,
        visits: action.visits,
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

const movieReducer: Reducer<IMovieState, AnyAction> = (
  state = initialMovieState,
  action
): IMovieState => {
  switch (action.type) {
    case keys.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.movies,
      }
    case keys.GET_MOVIE_PLAYS_SUCCESS:
      return {
        ...state,
        moviePlays: action.moviePlays,
      }
    case keys.GET_VIEW_HISTORY_SUCCESS:
      return {
        ...state,
        views: action.views
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
  movieState: movieReducer,
});

export default rootReducer;
