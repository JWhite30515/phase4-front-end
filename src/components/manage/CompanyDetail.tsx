import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getCompanyDetail } from '../../redux/actions/companyActions';
import { ICompany } from '../../redux/state/CompanyState';

import Table from '../common/Table';
import { TableStyles } from '../common/UserTable';

import '../../css/common.css';

export interface ICompanyDetailProps {
  getCompanyDetail(comName: string): void;
  company: ICompany | null;
}

function CompanyDetail(props: ICompanyDetailProps) {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const getCompanyDetailWrapper = async () => {
      const comName = location && location.state && location.state.comName ?
        location.state.comName : '';
      await props.getCompanyDetail(comName);
    }
    getCompanyDetailWrapper();
    // eslint-disable-next-line
  }, []);

  const { company } = props;

  const columns = [
    {
      Header: 'Name',
      accessor: 'thName',
    },
    {
      Header: 'Manager',
      accessor: 'name',
    },
    {
      Header: 'City',
      accessor: 'thCity',
    },
    {
      Header: 'State',
      accessor: 'thState',
    },
    {
      Header: 'Capacity',
      accessor: 'capacity',
    },
  ];

  return (
    <div className="flex-column">
      <h1>Company Detail</h1>
      {company &&
        <>
          <>
            <p><b>Name: </b>{company.comName}</p>
          </>
          <>
            <p>
              <b>Employees: </b>
              {company.employees.reduce((acc, value, idx, arr) => {
                return (idx === arr.length - 1) ?
                  acc + `${value.firstname} ${value.lastname}` :
                  acc + `${value.firstname} ${value.lastname}, `
              }, '')}
            </p>
          </>
          <>
            <h2>Theaters</h2>
            <TableStyles>
              <Table
                columns={columns}
                data={company.theaters.map(theater => (
                  {
                    ...theater,
                    name: `${theater.manUsername.username.firstname} ${theater.manUsername.username.lastname}`
                  }
                ))}
              />
            </TableStyles>
          </>
        </>
      }
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
    company: state.companyState.company,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCompanyDetail: bindActionCreators(getCompanyDetail, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyDetail);
