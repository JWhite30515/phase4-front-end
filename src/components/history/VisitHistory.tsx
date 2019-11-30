import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getVisits, ILogVisit } from '../../redux/actions/userActions';
import { IUser } from '../../redux/state/AccountState';
import { TableStyles, SelectColumnFilter, DateRangeColumnFilter } from '../common/UserTable';
import { TableWithFilters } from '../common/Table';
import { ITheater } from '../../redux/state/CompanyState';

export interface IVisitHistoryProps {
  user: IUser | null;
  visits: ILogVisit[];
  getVisits(user: IUser): void;
}

function VisitHistory(props: IVisitHistoryProps) {
  const { user, visits } = props;
  useEffect(() => {
    const wrap = async () => {
      user && await props.getVisits(user);
    }
    wrap();
  }, []);
  const columns = [
    {
      Header: 'Theater',
      accessor: 'thName',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Company',
      accessor: 'comName',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: 'Visit Date',
      accessor: 'visitDate',
      Filter: DateRangeColumnFilter,
      filter: 'date'
    },
  ]

  const history = useHistory();

  return (
    <div className="flex-column">
      <h1>Visit History</h1>
      <TableStyles>
        <TableWithFilters
          columns={columns}
          data={visits.map((visit) => {
            const { thName, thStreet, thCity, thZipcode, thState } = visit.theater as ITheater;

            return {
              ...visit,
              address: `${thStreet}, ${thCity}, ${thState} ${thZipcode}`
            }
          })}
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
    visits: state.userState.visits,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getVisits: bindActionCreators(getVisits, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitHistory);
