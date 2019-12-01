import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';
import { keys } from '../../constants/keys';
import { IUserTableEntry, UserStatus } from '../../redux/state/UserState';
import { ITheater } from '../state/CompanyState';
import { IUser } from '../state/AccountState';

export function getUsers() {
  return async (dispatch: any) => {
    try {
      const body = await axios.get(api + '/users');
      if (body && body.data) {
        t.info('Got users!');
        dispatch(getUsersSuccess(body.data));
      }
    } catch (e) {
      t.error('Failed to retrieve users');
      console.error(e);
    }
  }
}

export function updateUserStatus(username: string, status: UserStatus) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/users/', { username, status });

      if (body && body.data) {
        t.info(`Updated user ${username}`);
        dispatch(getUsers());
      }
    } catch (e) {
      t.error('Failed to update user');
      console.error(e);
    }
  }
}

export function getUsersSuccess(users: IUserTableEntry) {
  return {
    type: keys.GET_USERS_SUCCESS,
    users,
  }
}

export function getTheaters() {
  return async (dispatch: any) => {
    try {
      const body = await axios.get(api + '/users/theaters');

      if (body && body.data) {
        t.info('Got theaters');
        dispatch(getTheatersSuccess(body.data));
      }
    } catch (e) {
      t.error('Failed to get theaters');
      console.error(e);
    }
  }
}

export function getTheatersSuccess(theaters: ITheater[]) {
  return {
    type: keys.GET_THEATERS_SUCCESS,
    theaters,
  }
}

export interface ILogVisit {
  thName: string;
  comName: string;
  visitDate: string;
  user: IUser;
  theater?: ITheater;
}

export function logVisit(visit: ILogVisit) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/users/log-visit', { visit });
      console.log(body);
      t.info('Logged visit!');
    } catch (e) {
      t.error('Failed to log visit');
      console.error(e);
    }
  }
}

export function getVisits(user: IUser) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/users/visits', { user });

      if (body.data) {
        console.log(body.data);
        t.info('Got visits!');

        dispatch(getVisitsSuccess(body.data));
      }
    } catch (e) {
      t.error('Failed to get visits');
      console.error(e);
    }
  }
}

export function getVisitsSuccess(visits: ILogVisit[]) {
  return {
    type: keys.GET_VISITS_SUCCESS,
    visits,
  }
}