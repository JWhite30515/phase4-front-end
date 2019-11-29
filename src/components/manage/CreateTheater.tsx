import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select, { ValueType } from 'react-select';
import { bindActionCreators } from 'redux';

import states from '../../constants/states';
import TextInput from '../common/TextInput';
import { getCompanies } from '../../redux/actions/companyActions';
import { getValidManagers, createTheater } from '../../redux/actions/theaterActions';
import { ICompanyTableEntry } from '../../redux/state/CompanyState';
import { IManager } from '../../redux/state/TheaterState';

import '../../css/common.css';
import IRootState from '../../redux/state/RootState';

export interface ITheaterForm {
  name: string | null;
  company: ValueType<{ "label": string, "value": string }>;
  streetAddress: string | null;
  city: string | null;
  state: ValueType<{ "label": string, "value": string }>;
  zipCode: string | null;
  capacity: number | null;
  manager: ValueType<{ "label": string, "value": string }>;
}

export interface ICreateTheaterProps {
  companies: ICompanyTableEntry[];
  validManagers: IManager[];
  createTheater(theaterForm: ITheaterForm): void;
  getCompanies(): void;
  getValidManagers(): void;
}

function CreateTheater(props: ICreateTheaterProps) {
  const [theater, updateTheater] = useState({
    name: null,
    company: null,
    streetAddress: null,
    city: null,
    state: null,
    zipCode: null,
    capacity: null,
    manager: null
  } as ITheaterForm);

  const history = useHistory();

  useEffect(() => {
    const wrapper = async () => {
      await props.getValidManagers();
      await props.getCompanies();
    }
    wrapper();
    // eslint-disable-next-line
  }, []);

  const { companies, validManagers } = props;

  const {
    name,
    company,
    streetAddress,
    city,
    state,
    zipCode,
    capacity,
    manager
  } = theater;

  let createDisabled = true;

  if (
    name &&
    company &&
    streetAddress &&
    city &&
    state &&
    zipCode &&
    capacity &&
    manager
  ) {
    createDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>Create Theater</h1>
      <TextInput
        label="Name"
        name="name"
        onChange={(e) => updateTheater({
          ...theater,
          name: e.target.value,
        })}
      />
      <TextInput
        label="Street Address"
        name="streetAddress"
        onChange={(e) => updateTheater({
          ...theater,
          streetAddress: e.target.value,
        })}
      />
      <TextInput
        label="City"
        name="city"
        onChange={(e) => updateTheater({
          ...theater,
          city: e.target.value,
        })}
      />
      <TextInput
        label="Zip Code"
        name="zipCode"
        onChange={(e) => updateTheater({
          ...theater,
          zipCode: e.target.value,
        })}
      />
      State<br />
      <Select
        value={state}
        options={states}
        onChange={(option) => updateTheater({
          ...theater,
          state: option
        })}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
      Company<br />
      <Select
        value={company}
        options={companies.map(company => ({
          label: company.comName, value: company.comName
        }))}
        onChange={(option) => updateTheater({
          ...theater,
          company: option
        })}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
      Manager<br />
      <Select
        value={manager}
        options={validManagers.map(manager => ({
          label: `${manager.username.firstname} ${manager.username.lastname}`,
          value: manager.username.username
        }))}
        onChange={(option) => updateTheater({
          ...theater,
          manager: option
        })}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
      <div className="flex-row">
        <label>Capacity</label>
        <input
          type="number"
          onChange={(e) => updateTheater({
            ...theater,
            capacity: Number(e.target.value),
          })}
          name="capacity"
        />
      </div>
      <button
        className={createDisabled ? 'disabled' : ''}
        disabled={createDisabled}
        onClick={() => props.createTheater(theater)}
      >
        Create
      </button>
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
    validManagers: state.theaterState.validManagers,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    createTheater: bindActionCreators(createTheater, dispatch),
    getCompanies: bindActionCreators(getCompanies, dispatch),
    getValidManagers: bindActionCreators(getValidManagers, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTheater);
