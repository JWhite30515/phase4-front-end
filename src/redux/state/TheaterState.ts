export default interface ITheaterState {
  validManagers: IManager[];
  movies: ITheaterMovie[];
}

export interface ITheaterMovie {
  duration: string;
  movName: string;
  movPlayDate: string;
  movReleaseDate: string;
}

export const initialTheaterState: ITheaterState = {
  validManagers: [],
  movies: [],
}
export interface IManager {
  username: {
    username: string;
    firstname: string;
    lastname: string;
  }
}