import React, { useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../redux/actions/accountActions';

import '../css/common.css';

export interface ILoginPageProps {
  login(loginForm: { username: string, password: string }): void;
}

function LoginPage(props: ILoginPageProps) {
  const [formValues, setFormValues] = useState({ username: '', password: '' });

  let loginDisabled = true;

  if (
    formValues.username &&
    formValues.password
  ) {
    loginDisabled = false;
  }
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
          className={loginDisabled ? 'disabled' : ''}
          disabled={loginDisabled}
          onClick={() => {
            props.login(formValues);
          }}
        >
          Login
        </button>
        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
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