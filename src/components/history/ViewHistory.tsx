import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getViewHistory } from '../../redux/actions/movieActions';
import { IUser } from '../../redux/state/AccountState';
import { IView } from '../../redux/state/MovieState';

import Table from '../common/Table';
import { TableStyles } from '../common/UserTable';

import '../../css/common.css';

function ViewHistory(props: {
  user: IUser | null,
  views: IView[];
  getViewHistory(user: IUser): void 
}) {
  const { user, views } = props;
  const history = useHistory();

  useEffect(() => {
    const wrap = async () => {
      user && await props.getViewHistory(user);
    }
    wrap();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      Header: 'Movie',
      accessor: 'movName',
    },
    {
      Header: 'Theater',
      accessor: 'thName',
    },
    {
      Header: 'Company',
      accessor: 'comName',
    },
    {
      Header: 'Card#',
      accessor: 'creditCardNum',
    },
    {
      Header: 'View Date',
      accessor: 'movPlayDate',
    },
  ]

  return (
    <div className="flex-column">
      <h1>View History</h1>
      <TableStyles>
        <Table
          columns={columns}
          data={views.map(view => ({
            ...view,
            creditCardNum: (view && view.creditCardNum && view.creditCardNum.creditCardNum) ?
              view.creditCardNum.creditCardNum : '',
          }))}
        />
      </TableStyles>
      <button
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </div>
  );
}

const mapStateToProps = (state: IRootState) => {
  return {
    user: state.accountState.user,
    views: state.movieState.views,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getViewHistory: bindActionCreators(getViewHistory, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewHistory);
