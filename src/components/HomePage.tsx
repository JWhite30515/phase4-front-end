import * as React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import IRootState from '../redux/state/RootState';
import { UserType } from '../redux/state/AccountState';

import LogoutButton from '../components/common/LogoutButton';

import '../css/common.css';

export interface IHomePageProps {
  userType: UserType;
}

export function HomePage(props: IHomePageProps) {
  const { userType } = props;

  let Component: () => JSX.Element;

  switch (userType) {
    case (UserType.admin):
      Component = AdminView;
      break;
    case (UserType.adminCustomer):
      Component = AdminCustomerView;
      break;
    case (UserType.manager):
      Component = ManagerView;
      break;
    case (UserType.managerCustomer):
      Component = ManagerCustomerView;
      break;
    case (UserType.customer):
      Component = CustomerView;
      break;
    default:
      Component = UserView;
  }

  return <Component />;
}

const AdminView = () => {
  return (
    <div className="flex-column">
      <h1>Admin</h1>
      <Link to="/manage-user">
        <button>
          Manage User
        </button>
      </Link>
    </div>

  );
}

const AdminCustomerView = () => {
  return (
    <div className="flex-column">
      <h1>Admin Customer</h1>
      <Link to="/manage-user">
        <button>
          Manage User
        </button>
      </Link>
      <Link to="/manage-company">
        <button>
          Manage Company
        </button>
      </Link>
      <Link to="/create-movie">
        <button>
          Create Movie
        </button>
      </Link>
      <Link to="/visit-history">
        <button>
          Visit History
        </button>
      </Link>
      <Link to="/explore-movie">
        <button>
          Explore Movie
        </button>
      </Link>
      <Link to="/explore-theater">
        <button>
          Explore Theater
        </button>
      </Link>
      <Link to="/view-history">
        <button>
          View History
        </button>
      </Link>
      <LogoutButton
        label={'Back'}
      />
    </div>
  );
}

const ManagerView = () => {
  return (
    <div className="flex-column">
      <h1>Manager</h1>
      <Link to="/theater-overview">
        <button>
          Theater Overview
        </button>
      </Link>
      <Link to="/explore-theater">
        <button>
          Explore Theater
        </button>
      </Link>
      <Link to="/schedule-movie">
        <button>
          Schedule Movie
        </button>
      </Link>
      <Link to="/visit-history">
        <button>
          Visit History
        </button>
      </Link>
      <LogoutButton
        label={'Back'}
      />
    </div>
  );
}

const ManagerCustomerView = () => {
  return (
    <div className="flex-column">
      <h1>Manager-Customer</h1>
      <Link to="/theater-overview">
        <button>
          Theater Overview
        </button>
      </Link>
      <Link to="/explore-theater">
        <button>
          Explore Theater
        </button>
      </Link>
      <Link to="/explore-movie">
        <button>
          Explore Movie
        </button>
      </Link>
      <Link to="/schedule-movie">
        <button>
          Schedule Movie
        </button>
      </Link>
      <Link to="/view-history">
        <button>
          View History
        </button>
      </Link>
      <Link to="/visit-history">
        <button>
          Visit History
        </button>
      </Link>
      <LogoutButton
        label={'Back'}
      />
    </div>
  );
}

const CustomerView = () => {
  return (
    <div className="flex-column">
      <h1>Customer</h1>
      <Link to="/explore-theater">
        <button>
          Explore Theater
        </button>
      </Link>
      <Link to="/explore-movie">
        <button>
          Explore Movie
        </button>
      </Link>
      <Link to="/view-history">
        <button>
          View History
        </button>
      </Link>
      <Link to="/visit-history">
        <button>
          Visit History
        </button>
      </Link>
      <LogoutButton
        label={'Back'}
      />
    </div>
  );
}

const UserView = () => {
  return (
    <div className="flex-column">
      <h1>User</h1>
      <Link to="/explore-theater">
        <button>
          Explore Theater
        </button>
      </Link>
      <Link to="/visit-history">
        <button>
          Visit History
        </button>
      </Link>
      <LogoutButton
        label={'Back'}
      />
    </div>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    userType: state.accountState.userType ? state.accountState.userType : UserType.user,
  };
}

export default connect(
  mapStateToProps,
  () => ({})
)(HomePage);