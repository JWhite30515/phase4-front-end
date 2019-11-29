export default interface ICompanyState {
  companies: ICompanyTableEntry[];
  company: ICompany | null;
}

export interface ICompanyTableEntry {
  comName: string;
  numTheaters: number;
  numCities: number;
  numEmployees: number;
}

export interface ICompany {
  comName: string;
  theaters: ITheater[];
  employees: {
    firstname: string;
    lastname: string;
  }[],
}

export interface ITheater {
  capacity: number;
  manUsername: {
    username: {
      username: string;
      firstname: string;
      lastname: string;
    }
  }
  thCity: string;
  thName: string;
  thState: string;
  thStreet: string;
  thZipcode: string;
}

export const initialCompanyState: ICompanyState = {
  companies: [],
  company: null,
};