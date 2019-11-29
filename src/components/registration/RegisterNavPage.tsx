import * as React from 'react';

import { Link, useHistory } from 'react-router-dom';

import '../../css/common.css';

export default function RegisterNavPage() {
  const history = useHistory();

  const currPath = history.location.pathname;

  return (
    <div className="flex-column">
      <h1>Register Navigation</h1>
      <Link to={`${currPath}/user`}>
        <button>
          User Only
        </button>
      </Link>
      <Link to={`${currPath}/customer`}>
        <button>
          Customer Only
        </button>
      </Link>
      <Link to={`${currPath}/manager`}>
        <button>
          Manager Only
        </button>
      </Link>
      <Link to={`${currPath}/manager-customer`}>
        <button>
          Manager-Customer
        </button>
      </Link>
      <button onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
}