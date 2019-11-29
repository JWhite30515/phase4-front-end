import React, { useState } from 'react';

import { uniq } from 'lodash';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { registerCustomer } from '../../redux/actions/accountActions';
import TextInput from '../common/TextInput';
import { IUserForm } from './UserRegister';

import '../../css/common.css';

export interface ICustomerForm extends IUserForm {
  creditCards: string[];
}

export interface ICustomerRegisterProps {
  registerCustomer(customerForm: ICustomerForm): void;
}

export function CreditCardInput(props: {
  onCreditCardChange(creditCards: string[]): void;
}) {
  const [creditCards, updateCreditCards] = useState([
    ''
  ]);

  const { onCreditCardChange } = props;

  const maxCreditCards = 5;

  return (
    <div className="flex-column">
      <label>Credit Card #</label>
      {creditCards.map((card, idx) => (
        <div key={`card-${idx}`}>
          <input
            type="text"
            name={`card-${idx}`}
            value={card}
            onChange={(e) => {
              const newCreditCards = [...creditCards];
              newCreditCards.splice(idx, 1, e.target.value);
              updateCreditCards(newCreditCards);
              onCreditCardChange(newCreditCards);
            }}
          />
          {(idx < creditCards.length - 1) &&
            <button
              onClick={() => {
                console.log(idx);
                const newCreditCards = [...creditCards];
                newCreditCards.splice(idx, 1);
                console.log(newCreditCards);
                updateCreditCards(newCreditCards);
                onCreditCardChange(newCreditCards);
              }}
            >
              Remove
            </button>
          }
          {(idx === creditCards.length - 1 && creditCards.length !== maxCreditCards) &&
            <button
              onClick={() => {
                const newCreditCards = [...creditCards];
                newCreditCards.push('');
                updateCreditCards(newCreditCards);
                onCreditCardChange(newCreditCards);
              }}
            >
              Add
            </button>
          }

        </div>
      ))}
    </div>
  )
}

function CustomerRegister(props: ICustomerRegisterProps) {
  const history = useHistory();

  const [customer, updateCustomer] = useState({
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    confirmPassword: null,
    creditCards: []
  } as ICustomerForm);

  let registerDisabled = true;

  const {
    username,
    firstname,
    lastname,
    password,
    confirmPassword,
    creditCards
  } = customer;

  const validCards = creditCards.filter(card => card.length === 16);

  if (
    username &&
    firstname &&
    lastname &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    creditCards.length &&
    uniq(creditCards).length === creditCards.length &&
    validCards.length === creditCards.length
  ) {
    registerDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>Customer-Only Registration</h1>
      <TextInput
        label="First Name"
        name="firstname"
        onChange={(e) => updateCustomer({
          ...customer,
          firstname: e.target.value,
        })}
      />
      <TextInput
        label="Last Name"
        name="lastname"
        onChange={(e) => updateCustomer({
          ...customer,
          lastname: e.target.value,
        })}
      />
      <TextInput
        label="Username"
        name="username"
        onChange={(e) => updateCustomer({
          ...customer,
          username: e.target.value,
        })}
      />
      <TextInput
        label="Password"
        name="password"
        onChange={(e) => updateCustomer({
          ...customer,
          password: e.target.value,
        })}
      />
      <TextInput
        label="Confirm Password"
        name="confirmPassword"
        onChange={(e) => updateCustomer({
          ...customer,
          confirmPassword: e.target.value,
        })}
      />
      <CreditCardInput
        onCreditCardChange={(creditCards) => updateCustomer({
          ...customer,
          creditCards,
        })}
      />
      <div className="flex-row">
        <button onClick={() => history.goBack()}>
          Back
        </button>
        <button
          className={registerDisabled ? 'disabled' : ''}
          disabled={registerDisabled}
          onClick={() => props.registerCustomer(customer)}
        >
          Register
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    registerCustomer: bindActionCreators(registerCustomer, dispatch),
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(CustomerRegister);