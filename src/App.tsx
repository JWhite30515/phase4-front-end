import React from 'react';

import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch
} from 'react-router-dom';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import CustomerRegister from './components/registration/CustomerRegister';
import ManagerCustomerRegister from './components/registration/ManagerCustomerRegister';
import ManagerRegister from './components/registration/ManagerRegister';
import RegisterNavPage from './components/registration/RegisterNavPage';
import UserRegister from './components/registration/UserRegister';
import IRootState from './redux/state/RootState';

import ViewHistory from './components/history/ViewHistory';
import VisitHistory from './components/history/VisitHistory';
import CompanyDetail from './components/manage/CompanyDetail';
import CreateTheater from './components/manage/CreateTheater';
import ManageCompany from './components/manage/ManageCompany';
import ManageUser from './components/manage/ManageUser';
import CreateMovie from './components/movies/CreateMovie';
import ExploreMovie from './components/movies/ExploreMovie';
import ScheduleMovie from './components/movies/ScheduleMovie';
import ExploreTheater from './components/theaters/ExploreTheater';

import './App.css';

export const api = 'http://localhost:3001'

enum RedirectWhen {
  authenticated = 'authenticated',
  notAuthenticated = 'notAuthenticated',
}

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
        <RedirectingRoute
          exact
          path="/manage-user"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={ManageUser}
        />
        <RedirectingRoute
          exact
          path="/manage-company"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={ManageCompany}
        />
        <RedirectingRoute
          exact
          path="/manage-company/company-detail"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={CompanyDetail}
        />
        <RedirectingRoute
          exact
          path="/manage-company/create-theater"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={CreateTheater}
        />
        <RedirectingRoute
          exact
          path="/create-movie"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={CreateMovie}
        />
        <RedirectingRoute
          exact
          path="/explore-movie"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={ExploreMovie}
        />
        <RedirectingRoute
          exact
          path="/explore-theater"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={ExploreTheater}
        />
        <RedirectingRoute
          exact
          path="/schedule-movie"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={ScheduleMovie}
        />
        <RedirectingRoute
          exact
          path="/view-history"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={ViewHistory}
        />
        <RedirectingRoute
          exact
          path="/visit-history"
          isAuthenticated={isAuthenticated}
          redirectPath="/login"
          redirectWhen={RedirectWhen.notAuthenticated}
          component={VisitHistory}
        />
        <Route
          exact
          path="/register"
        >
          <RegisterNavPage />
        </Route>
        <Route
          exact
          path="/register/user"
        >
          <UserRegister />
        </Route>
        <Route
          exact
          path="/register/customer"
        >
          <CustomerRegister />
        </Route>
        <Route
          exact
          path="/register/manager-customer"
        >
          <ManagerCustomerRegister />
        </Route>
        <Route
          exact
          path="/register/manager"
        >
          <ManagerRegister />
        </Route>
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
