import React, { useEffect, useState } from 'react';

import { uniq } from 'lodash';
import Select from 'react-select';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getCompanies } from '../../redux/actions/companyActions';
import { registerManagerCustomer } from '../../redux/actions/accountActions';
import { ICompanyTableEntry } from '../../redux/state/CompanyState';
import { ICustomerForm, CreditCardInput } from './CustomerRegister';
import { IManagerForm } from './ManagerRegister';

import IRootState from '../../redux/state/RootState';
import TextInput from '../common/TextInput';
import states from '../../constants/states';

export interface IManagerCustomerForm extends IManagerForm, ICustomerForm { }

export interface IManagerCustomerRegisterProps {
  companies: ICompanyTableEntry[];
  getCompanies(): void;
  registerManagerCustomer(managerCustomerForm: IManagerCustomerForm): void;
}

function ManagerCustomerRegister(props: IManagerCustomerRegisterProps) {
  const [managerCustomer, updateManagerCustomer] = useState({
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
    creditCards: []
  } as IManagerCustomerForm);

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
    zipCode,
    creditCards,
  } = managerCustomer;

  const validCards = creditCards.filter(card => card.length === 16);

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
    zipCode &&
    creditCards.length &&
    uniq(creditCards).length === creditCards.length &&
    validCards.length === creditCards.length
  ) {
    registerDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>Manager-Customer Registration</h1>
      <TextInput
        label="First Name"
        name="firstname"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          firstname: e.target.value,
        })}
      />
      <TextInput
        label="Last Name"
        name="lastname"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          lastname: e.target.value,
        })}
      />
      <TextInput
        label="Username"
        name="username"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          username: e.target.value,
        })}
      />
      <TextInput
        label="Password"
        name="password"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          password: e.target.value,
        })}
      />
      <TextInput
        label="Confirm Password"
        name="confirmPassword"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          confirmPassword: e.target.value,
        })}
      />
      <CreditCardInput
        onCreditCardChange={(creditCards) => updateManagerCustomer({
          ...managerCustomer,
          creditCards,
        })}
      />
      <TextInput
        label="Street Address"
        name="streetAddress"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          streetAddress: e.target.value,
        })}
      />
      <TextInput
        label="City"
        name="city"
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
          city: e.target.value,
        })}
      />
      Company<br />
      <Select
        value={company}
        options={props.companies.map(company => ({
          label: company.comName, value: company.comName
        }))}
        onChange={(option) => updateManagerCustomer({
          ...managerCustomer,
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
        onChange={(option) => updateManagerCustomer({
          ...managerCustomer,
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
        onChange={(e) => updateManagerCustomer({
          ...managerCustomer,
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
          onClick={() => props.registerManagerCustomer(managerCustomer)}
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
    registerManagerCustomer: bindActionCreators(registerManagerCustomer, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManagerCustomerRegister);