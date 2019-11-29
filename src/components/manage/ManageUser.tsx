import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getUsers, updateUserStatus } from '../../redux/actions/userActions';
import { IUserTableEntry, UserStatus } from '../../redux/state/UserState';

import UserTable, { SelectColumnFilter, TableStyles } from '../common/UserTable';

export interface IManageUserProps {
  getUsers(): void;
  updateUserStatus(username: string, userStatus: UserStatus): void;
  users: IUserTableEntry[];
}

function ManageUser(props: IManageUserProps) {
  useEffect(() => {
    const getUsersWrapper = async () => {
      await props.getUsers();
    }

    getUsersWrapper();
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  const columns = [
    {
      id: 'selection',
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: any) => (
        <div>
          <input type="checkbox" {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Credit Card Count',
      accessor: 'creditCardCount',
    },
    {
      Header: 'User Type',
      accessor: 'userType',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: 'Status',
      accessor: 'userStatus',
      Filter: SelectColumnFilter,
      filter: 'includes'
    }
  ];

  return (
    <div className="flex-column">
      <h1>Manage User</h1>
      <TableStyles>
        <UserTable
          columns={columns}
          data={props.users ? props.users : []}
          updateUserStatus={props.updateUserStatus}
        />
      </TableStyles>
      <button onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    users: state.userState.users,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    updateUserStatus: bindActionCreators(updateUserStatus, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageUser);
