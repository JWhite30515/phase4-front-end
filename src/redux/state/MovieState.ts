export default interface IMovieState {
  movies: IMovie[];
  moviePlays: IMoviePlay[];
  views: IView[];
}

export interface IMovie {
  movName: string;
  movReleaseDate: Date;
  duration: string;
}

export interface IView {
  comName: string;
  movName: string;
  thName: string;
  creditCardNum: any;
  movPlayDate: string;
}

export interface IMoviePlay {
  comName: string;
  movName: string;
  movPlayDate: string;
  theater: {
    capacity: number;
    thCity: string;
    thName: string;
    thState: string;
    thStreet: string;
    thZipcode: string;
  }
}

export const initialMovieState: IMovieState = {
  movies: [],
  moviePlays: [],
  views: [],
}