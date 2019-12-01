import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../../redux/actions/accountActions';

export interface ILogoutButtonProps {
  label: string;
  logout(): void;
}

function LogoutButton(props: ILogoutButtonProps) {
  return (
    <button
      onClick={async () => await props.logout()}
    >
      {props.label}
    </button>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: bindActionCreators(logout, dispatch),
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(LogoutButton)
