import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';
import { keys } from '../../constants/keys';
import { IUserTableEntry, UserStatus } from '../../redux/state/UserState';

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