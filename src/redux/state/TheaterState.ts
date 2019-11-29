export default interface ITheaterState {
  validManagers: IManager[];
}

export const initialTheaterState = {
  validManagers: [],
}
export interface IManager {
  username: {
    username: string;
    firstname: string;
    lastname: string;
  }
}