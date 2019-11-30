import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getTheaters, ILogVisit, logVisit } from '../../redux/actions/userActions';
import { ITheater } from '../../redux/state/CompanyState';

import '../../css/common.css';
import { TableStyles, SelectColumnFilter } from '../common/UserTable';
import { ExploreTheaterTable } from '../common/Table';
import { IUser } from '../../redux/state/AccountState';

export interface IExploreTheaterProps {
  theaters: ITheater[];
  user: IUser | null;
  getTheaters(): void;
  logVisit(visit: ILogVisit): void;
}

function ExploreTheater(props: IExploreTheaterProps) {
  useEffect(() => {
    const wrap = async () => {
      await props.getTheaters();
    }
    wrap();
  }, []);

  const history = useHistory();

  const [visitDate, updateVisitDate] = useState(null as any);

  const { theaters, user } = props;

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
  ]

  return (
    <div className="flex-column">
      <h1>Explore Theater</h1>
      <TableStyles>
        <ExploreTheaterTable
          columns={columns}
          data={theaters.map((theater) => {
            const { thCity, thState, thStreet, thZipcode } = theater;

            return {
              ...theater,
              address: `${thStreet}, ${thCity}, ${thState} ${thZipcode}`,
              comName: theater.comName.comName,
            }
          })}
          logVisit={props.logVisit}
          user={user}
          visitDate={visitDate}
        />
      </TableStyles>
      <div className="flex-row">
        <label>Visit Date</label>
        <DatePicker
          selected={visitDate}
          onChange={(date: Date) => {
            date && updateVisitDate(date);
          }}
        />
      </div>
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
    theaters: state.userState.theaters,
    user: state.accountState.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTheaters: bindActionCreators(getTheaters, dispatch),
    logVisit: bindActionCreators(logVisit, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreTheater);