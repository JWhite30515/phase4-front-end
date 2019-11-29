import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';
import { keys } from '../../constants/keys';

import { ITheaterForm } from '../../components/manage/CreateTheater';
import { IManager } from '../state/TheaterState';

export function createTheater(theaterForm: ITheaterForm) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/theaters', theaterForm);
      console.log(body);

      if (body.data) {
        t.info('Created new theater successfully');
      } else {
        t.error('Failed to create theater');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getValidManagers() {
  return async (dispatch: any) => {
    try {
      const body = await axios.get(api + '/users/valid-managers');
      console.log(body);

      if (body.data) {
        t.info('Got valid managers');
        dispatch(getValidManagersSuccess(body.data));
      } else {
        t.error('Failed to retrieve valid managers');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getValidManagersSuccess(validManagers: IManager[]) {
  return {
    type: keys.GET_VALID_MANAGERS_SUCCESS,
    validManagers,
  }
}