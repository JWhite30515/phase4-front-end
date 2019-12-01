import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextInput from '../common/TextInput';

import { registerUser } from '../../redux/actions/accountActions';

import '../../css/common.css';

export interface IUserForm {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface IUserRegisterProps {
  registerUser(userForm: IUserForm): void;
}

function UserRegister(props: IUserRegisterProps) {
  const history = useHistory();

  const [user, updateUser] = useState({
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    confirmPassword: null,
  } as IUserForm);

  let registerDisabled = true;

  const {
    username,
    firstname,
    lastname,
    password,
    confirmPassword
  } = user;
  if (
    username &&
    firstname &&
    lastname &&
    password &&
    confirmPassword &&
    password === confirmPassword
  ) {
    registerDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>User-Only Registration</h1>
      <TextInput
        label="First Name"
        name="firstname"
        onChange={(e) => updateUser({
          ...user,
          firstname: e.target.value,
        })}
      />
      <TextInput
        label="Last Name"
        name="lastname"
        onChange={(e) => updateUser({
          ...user,
          lastname: e.target.value,
        })}
      />
      <TextInput
        label="Username"
        name="username"
        onChange={(e) => updateUser({
          ...user,
          username: e.target.value,
        })}
      />
      <TextInput
        label="Password"
        name="password"
        onChange={(e) => updateUser({
          ...user,
          password: e.target.value,
        })}
      />
      <TextInput
        label="Confirm Password"
        name="confirmPassword"
        onChange={(e) => updateUser({
          ...user,
          confirmPassword: e.target.value,
        })}
      />
      <div className="flex-row">
        <button onClick={() => history.goBack()}>
          Back
        </button>
        <button
          className={registerDisabled ? 'disabled' : ''}
          disabled={registerDisabled}
          onClick={() => props.registerUser(user)}
        >
          Register
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerUser: bindActionCreators(registerUser, dispatch),
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(UserRegister);