import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getCompanies } from '../../redux/actions/companyActions';
import { ICompanyTableEntry } from '../../redux/state/CompanyState';

import CompanyTable from '../common/CompanyTable';
import {
  NumberRangeColumnFilter,
  SelectColumnFilter,
  TableStyles
} from '../common/UserTable';

import '../../css/common.css';

export interface IManageCompanyProps {
  companies: ICompanyTableEntry[];
  getCompanies(): void;
}

function ManageCompany(props: IManageCompanyProps) {
  useEffect(() => {
    const getCompaniesWrapper = async () => {
      await props.getCompanies();
    }

    getCompaniesWrapper();
    // eslint-disable-next-line
  }, []);

  const history = useHistory();
  const location = useLocation();

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
      Header: 'Name',
      accessor: 'comName',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: '#CityCovered',
      accessor: 'numCities',
      Filter: NumberRangeColumnFilter,
      filter: 'between'
    },
    {
      Header: '#Theaters',
      accessor: 'numTheaters',
      Filter: NumberRangeColumnFilter,
      filter: 'between'
    },
    {
      Header: '#Employees',
      accessor: 'numEmployees',
      Filter: NumberRangeColumnFilter,
      filter: 'between'
    }
  ];

  return (
    <div className="flex-column">
      <h1>Manage Company</h1>
      <Link to={location.pathname + '/create-theater'}>
        <button>
          Create Theater
        </button>
      </Link>
      <TableStyles>
        <CompanyTable
          columns={columns}
          data={props.companies ? props.companies : []}
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
    companies: state.companyState.companies,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCompanies: bindActionCreators(getCompanies, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCompany);
