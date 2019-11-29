import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import TextInput from '../common/TextInput';
import { createMovie } from '../../redux/actions/movieActions';

import '../../css/common.css';
import 'react-datepicker/dist/react-datepicker.css';

export interface IMovieForm {
  name: string | null;
  duration: number | null;
  date: Date;
}

export interface ICreateMovie {
  createMovie(movieForm: IMovieForm): void;
}

function CreateMovie(props: ICreateMovie) {
  const [movie, updateMovie] = useState({
    name: null,
    duration: null,
    date: new Date(),
  } as IMovieForm);

  const history = useHistory();

  const {
    name,
    duration,
    date
  } = movie;

  let createDisabled = true;
  if (
    name &&
    duration &&
    date
  ) {
    createDisabled = false;
  }

  return (
    <div className="flex-column">
      <h1>Create Movie</h1>
      <TextInput
        label="Name"
        name="name"
        onChange={(e) => updateMovie({
          ...movie,
          name: e.target.value,
        })}
      />
      <div className="flex-row">
        <label>Duration</label>
        <input
          type="number"
          onChange={(e) => updateMovie({
            ...movie,
            duration: Number(e.target.value),
          })}
          name="duration"
        />
      </div>
      <div className="flex-row">
        <label>Release Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => {
            date && updateMovie({
              ...movie,
              date,
            });
          }}
        />
      </div>
      <button
        className={createDisabled ? 'disabled' : ''}
        disabled={createDisabled}
        onClick={() => props.createMovie(movie)}
      >
        Create
      </button>
      <button
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createMovie: bindActionCreators(createMovie, dispatch),
  }
}
export default connect(
  () => ({}),
  mapDispatchToProps,
)(CreateMovie);