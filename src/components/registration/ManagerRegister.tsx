import React, { useEffect, useState } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select, { ValueType } from 'react-select';

import states from '../../constants/states';
import IRootState from '../../redux/state/RootState';
import TextInput from '../common/TextInput';

import { registerManager } from '../../redux/actions/accountActions';
import { getCompanies } from '../../redux/actions/companyActions';
import { ICompanyTableEntry } from '../../redux/state/CompanyState';
import { IUserForm } from './UserRegister';


export interface IManagerForm extends IUserForm {
  company: ValueType<{ "label": string, "value": string }>;
  streetAddress: string | null;
  state: ValueType<{ "label": string, "value": string }>;
  city: string | null;
  zipCode: string | null;
}

export interface IManagerRegisterProps {
  companies: ICompanyTableEntry[];
  getCompanies(): void;
  registerManager(managerForm: IManagerForm): void;
}

function ManagerRegister(props: IManagerRegisterProps) {
  const [manager, updateManager] = useState({
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    confirmPassword: null,
    company: null,
    streetAddress: null,
    state: null,
    city: null,
    zipCode: null,
  } as IManagerForm);

  useEffect(() => {
    const callGetCompanies = async () => {
      await props.getCompanies();
    }
    callGetCompanies();
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  let registerDisabled = true;

  const {
    firstname,
    lastname,
    username,
    password,
    confirmPassword,
    company,
    streetAddress,
    state,
    city,
    zipCode
  } = manager;

  if (
    firstname &&
    lastname &&
    username &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    company &&
    streetAddress &&
    state &&
    city &&
    zipCode
  ) {
    registerDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>Manager-Only Registration</h1>
      <TextInput
        label="First Name"
        name="firstname"
        onChange={(e) => updateManager({
          ...manager,
          firstname: e.target.value,
        })}
      />
      <TextInput
        label="Last Name"
        name="lastname"
        onChange={(e) => updateManager({
          ...manager,
          lastname: e.target.value,
        })}
      />
      <TextInput
        label="Username"
        name="username"
        onChange={(e) => updateManager({
          ...manager,
          username: e.target.value,
        })}
      />
      <TextInput
        label="Password"
        name="password"
        onChange={(e) => updateManager({
          ...manager,
          password: e.target.value,
        })}
      />
      <TextInput
        label="Confirm Password"
        name="confirmPassword"
        onChange={(e) => updateManager({
          ...manager,
          confirmPassword: e.target.value,
        })}
      />
      <TextInput
        label="Street Address"
        name="streetAddress"
        onChange={(e) => updateManager({
          ...manager,
          streetAddress: e.target.value,
        })}
      />
      <TextInput
        label="City"
        name="city"
        onChange={(e) => updateManager({
          ...manager,
          city: e.target.value,
        })}
      />
      Company<br />
      <Select
        value={company}
        options={props.companies.map(company => ({
          label: company.comName, value: company.comName
        }))}
        onChange={(option) => updateManager({
          ...manager,
          company: option
        })}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
      State<br />
      <Select
        value={state}
        options={states}
        onChange={(option) => updateManager({
          ...manager,
          state: option
        })}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
      <TextInput
        label="Zipcode"
        name="zipcode"
        onChange={(e) => updateManager({
          ...manager,
          zipCode: e.target.value,
        })}
      />


      <div className="flex-row">
        <button onClick={() => history.goBack()}>
          Back
        </button>
        <button
          className={registerDisabled ? 'disabled' : ''}
          disabled={registerDisabled}
          onClick={() => props.registerManager(manager)}
        >
          Register
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IRootState) => {
  return {
    companies: state.companyState.companies,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCompanies: bindActionCreators(getCompanies, dispatch),
    registerManager: bindActionCreators(registerManager, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManagerRegister);