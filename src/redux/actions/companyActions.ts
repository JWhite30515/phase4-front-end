import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';
import { ICompanyTableEntry, ITheater } from '../state/CompanyState';

import { keys } from '../../constants/keys';

export function getCompanies() {
  return async (dispatch: any) => {
    try {
      const body = await axios.get(api + '/companies');
      if (body.data) {
        console.log(body.data);
        t.info('Got companies');
        dispatch(getCompaniesSuccess(body.data));
      }
    } catch (e) {
      console.error(e);
      t.error('Failed to retrieve companies');
    }
  }
}

export function getCompaniesSuccess(companies: ICompanyTableEntry[]) {
  return {
    type: keys.GET_COMPANIES_SUCCESS,
    companies,
  }
}

export function getCompanyDetail(comName: string) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/companies/company-detail', { comName });
      if (body.data) {
        console.log(body.data);
        t.info(`Got company detail for ${comName}`);
        dispatch(getCompanyDetailSuccess(body.data));
      }
    } catch (e) {
      console.error(e);
      t.error('Failed to retrieve companies');
    }
  }
}

export interface IGetCompanyDetailBody {
  company: { comName: string };
  employees: {
    username: {
      firstname: string;
      lastname: string;
    }
  }[];
  theaters: ITheater[];
}

export function getCompanyDetailSuccess({ company, employees, theaters }: IGetCompanyDetailBody) {
  const companyDetail = {
    comName: company.comName,
    employees: employees.map(employee => employee.username),
    theaters
  }

  return {
    type: keys.GET_COMPANY_DETAIL_SUCCESS,
    companyDetail,
  }
}