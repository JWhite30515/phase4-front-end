import React from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch
} from 'react-router-dom';

import { connect } from 'react-redux';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

import IRootState from './redux/state/RootState';


import './App.css';

export const api = 'http://localhost:3001'

function App(props: { isAuthenticated: boolean }) {
  const { isAuthenticated } = props;

  return (
    <Router>
      <Switch>
        <RedirectingRoute
          exact
          path="/login"
          isAuthenticated={isAuthenticated}
          redirectPath="/"
          redirectWhen={RedirectWhen.authenticated}
          component={LoginPage}
        />
        <RedirectingRoute
          exact
          path="/"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={HomePage}
        />
      </Switch>
    </Router>
  );
}

interface IRedirectingRouteProps extends RouteProps {
  component: React.StatelessComponent<any> | React.ComponentClass<any, any>,
  isAuthenticated: boolean;
  redirectPath: string;
  redirectWhen: RedirectWhen;
  extraProps?: any;
}

enum RedirectWhen {
  authenticated = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}

function RedirectingRoute(props: IRedirectingRouteProps) {
  const {
    component,
    isAuthenticated,
    redirectPath,
    redirectWhen, 
    ...rest
  } = props;
  return (
    <Route
      {...rest}
      render={({ location }) => {
        const Component = component;

        if (
          (isAuthenticated && redirectWhen === RedirectWhen.authenticated) ||
          (!isAuthenticated && redirectWhen === RedirectWhen.notAuthenticated)
        ) {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
                state: { from: location }
              }}
            />
          )
        }

        return (
          <Route
            {...rest}
            render={(renderProps) => (
              <Component {...renderProps} />
            )}
          />
        );
      }}
    />
  )
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.accountState.isAuthenticated,
  };
}
const mapDispatchToProps = (dispatch: any) => {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
