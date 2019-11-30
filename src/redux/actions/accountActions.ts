import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';

import { keys } from '../../constants/keys';
import { IUser, UserType } from '../state/AccountState';

import { ICustomerForm } from '../../components/registration/CustomerRegister';
import { IManagerCustomerForm } from '../../components/registration/ManagerCustomerRegister';
import { IManagerForm } from '../../components/registration/ManagerRegister';
import { IUserForm } from '../../components/registration/UserRegister';
import { ICreditCard } from '../state/UserState';

export function login(loginForm: { username: string, password: string }) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/users/login', loginForm);
      console.log(body);

      if (body.data && body.data.user && body.data.type && body.data.creditCards) {
        t.info('Login successful');

        const {
          user, type, creditCards
        } = body.data;
        dispatch(authSuccess(user, type, creditCards));
      } else {
        t.error('Login failed');
        dispatch(authFailure())
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function registerUser(userForm: IUserForm) {
  return async (dispatch: any) => {
    try {
      await axios.post(api + '/users/register-user', userForm);

      t.info('Registration successful!');
    } catch (e) {
      t.error('Registration failed');
      console.error(e);
    }
  }
}

export function registerCustomer(customerForm: ICustomerForm) {
  return async (dispatch: any) => {
    try {
      await axios.post(api + '/users/register-customer', customerForm);

      t.info('Registration successful!');
    } catch (e) {
      t.error('Registration failed');
      console.error(e);
    }
  }
}

export function registerManager(managerForm: IManagerForm) {
  return async (dispatch: any) => {
    try {
      await axios.post(api + '/users/register-manager', managerForm);

      t.info('Registration successful!');
    } catch (e) {
      t.error('Registration failed');
      console.error(e);
    }
  }
}

export function registerManagerCustomer(managerCustomerForm: IManagerCustomerForm) {
  return async (dispatch: any) => {
    try {
      await axios.post(api + '/users/register-manager-customer', managerCustomerForm);

      t.info('Registration successful!');
    } catch (e) {
      t.error('Registration failed');
      console.error(e);
    }
  }
}

export function authSuccess(user: IUser, userType: UserType, creditCards: ICreditCard) {
  return {
    type: keys.AUTH_SUCCESS,
    userType,
    user,
    creditCards,
  }
}

export function authFailure() {
  return {
    type: keys.AUTH_FAILURE,
  }
}