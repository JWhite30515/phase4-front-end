import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import Select, { ValueType } from 'react-select';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { scheduleMovie, getMovies } from '../../redux/actions/movieActions';
import { IMovie } from '../../redux/state/MovieState';

import '../../css/common.css';
import 'react-datepicker/dist/react-datepicker.css';
import IRootState from '../../redux/state/RootState';
import { IUser } from '../../redux/state/AccountState';

export interface IScheduleMovieForm {
  name: ValueType<{ "label": string, "value": string }>;
  releaseDate: Date;
  playDate: Date;
}

export interface IScheduleMovieProps {
  movies: IMovie[];
  user: IUser | null;
  getMovies(): void;
  scheduleMovie(movie: IScheduleMovieForm, user: IUser | null): void;
}

function ScheduleMovie(props: IScheduleMovieProps) {
  useEffect(() => {
    const wrap = async () => {
      await props.getMovies();
    }
    wrap();
    // eslint-disable-next-line
  }, []);

  const { movies, user } = props;

  const [movie, updateMovie] = useState({
    name: null,
    releaseDate: new Date(),
    playDate: new Date(),
  } as IScheduleMovieForm);

  const history = useHistory();

  const {
    name,
    releaseDate,
    playDate
  } = movie;

  let scheduleDisabled = true;

  if (
    name &&
    releaseDate &&
    playDate &&
    playDate.getTime() >= releaseDate.getTime()
  ) {
    scheduleDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>Schedule Movie</h1>
      Name<br />
      <Select
        value={name}
        options={movies.map(movie => ({
          label: movie.movName, value: movie.movName
        }))}
        onChange={(option) => {
          const opt = option as { label: string, value: string };
          const movName = opt.value;

          const mov = movies.find(mov => mov.movName === movName);
        
          updateMovie({
            ...movie,
            name: option,
            releaseDate: mov ? new Date(mov.movReleaseDate) : releaseDate,
          });
        }}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
      <div className="flex-row">
        <label>Release Date</label>
        <DatePicker
          disabled={true}
          selected={releaseDate}
          onChange={(releaseDate) => {
            releaseDate && updateMovie({
              ...movie,
              releaseDate,
            });
          }}
        />
      </div>
      <div className="flex-row">
        <label>Play Date</label>
        <DatePicker
          selected={playDate}
          onChange={(playDate) => {
            playDate && updateMovie({
              ...movie,
              playDate,
            });
          }}
        />
      </div>
      <button
        className={scheduleDisabled ? 'disabled' : ''}
        disabled={scheduleDisabled}
        onClick={() => props.scheduleMovie(movie, user)}
      >
        Add
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
    movies: state.movieState.movies,
    user: state.accountState.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMovies: bindActionCreators(getMovies, dispatch),
    scheduleMovie: bindActionCreators(scheduleMovie, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleMovie);