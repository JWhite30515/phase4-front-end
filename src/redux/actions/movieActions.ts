import axios from 'axios';
import { toast as t } from 'react-toastify';

import { api } from '../../App';
import { IMovieForm } from '../../components/movies/CreateMovie';
import { keys } from '../../constants/keys';

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