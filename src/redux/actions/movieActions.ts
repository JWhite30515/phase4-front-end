import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';
import { IMovieForm } from '../../components/movies/CreateMovie';
import { IScheduleMovieForm } from '../../components/movies/ScheduleMovie';
import { IMovie, IMoviePlay, IView } from '../../redux/state/MovieState';
import { keys } from '../../constants/keys';
import { IUser } from '../state/AccountState';

export function createMovie(movieForm: IMovieForm) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/movies', movieForm);
      console.log(body);

      if (body.data) {
        t.info('Created new movie successfully');
      } else {
        t.error('Failed to create movie');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getMovies() {
  return async (dispatch: any) => {
    try {
      const body = await axios.get(api + '/movies');
      console.log(body);

      if (body.data) {
        t.info('Got movies!');
        dispatch(getMoviesSuccess(body.data));
      } else {
        t.error('Failed to get movies');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getMoviesSuccess(movies: IMovie[]) {
  return {
    type: keys.GET_MOVIES_SUCCESS,
    movies,
  }
}

export function scheduleMovie(movie: IScheduleMovieForm, user: IUser | null) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/movies/schedule-movie', { movie, user });
      console.log(body);

      if (body.data) {
        t.info('Scheduled movie!');
      } else {
        t.error('Failed to schedule movie');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getMoviePlays() {
  return async (dispatch: any) => {
    try {
      const body = await axios.get(api + '/movies/movie-plays');
      console.log(body);

      if (body.data) {
        t.info('Got movie plays');
        dispatch(getMoviePlaysSuccess(body.data));
      } else {
        t.error('Failed to get movie plays');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getMoviePlaysSuccess(moviePlays: IMoviePlay[]) {
  return {
    type: keys.GET_MOVIE_PLAYS_SUCCESS,
    moviePlays,
  }
}

export function viewMovie(moviePlay: IMoviePlay, cardNum: string, user: IUser) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/movies/view-movie', { moviePlay, cardNum, user });

      if (body.data) {
        t.info('Successfully viewed movie!');
      } else {
        t.error('Failed to view movie');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getViewHistory(user: IUser) {
  return async (dispatch: any) => {
    try {
      const body = await axios.post(api + '/movies/view-history', { user });

      if (body.data) {
        dispatch(getViewHistorySuccess(body.data));
        t.info('Successfully got view history!');
      } else {
        t.error('Failed to get view history');
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getViewHistorySuccess(views: IView[]) {
  return {
    type: keys.GET_VIEW_HISTORY_SUCCESS,
    views
  }
}