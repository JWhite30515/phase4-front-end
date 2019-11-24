import { keys } from '../keys';
import axios from 'axios';

import { api } from '../../App';

export function login(loginForm: { username: string, password: string }) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/users/login', loginForm);
      console.log(body);

      await dispatch(() => {
        return {
          type: keys.AUTH_SUCCESS,
          isAuthenticated: true,
        }
      })
    } catch(e) {
      console.error(e);
    }
  }
}