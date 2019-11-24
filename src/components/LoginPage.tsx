import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from '../redux/actions/accountActions';

import '../css/common.css';

export interface ILoginPageProps {
  login(loginForm: { username: string, password: string }): void;
}

function LoginPage(props: ILoginPageProps) {
  const [formValues, setFormValues] = useState({ username: '', password: ''});

  return (
    <div className="flex-column">
      <h1>Atlanta Movie Login</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => setFormValues({
            ...formValues,
            username: e.target.value,
          })}
          name="username"
        />

        <label>Password</label>
        <input
          type="text"
          onChange={(e) => setFormValues({
            ...formValues,
            password: e.target.value,
          })}
          name="password"
        />

        <div className="flex-row">
          <button
            disabled={
              !(formValues.username.length > 5 && formValues.password.length > 5)
            }
            onClick={() => {
              console.log(formValues);
              props.login(formValues);
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              console.log('register');
            }}
          >
            Register
          </button>
        </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(LoginPage);