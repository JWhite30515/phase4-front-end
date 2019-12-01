import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IRootState from '../../redux/state/RootState';
import { getTheaterMovies } from '../../redux/actions/theaterActions';
import { IUser } from '../../redux/state/AccountState';
import { ITheaterMovie } from '../../redux/state/TheaterState';
import { TableStyles, DateRangeColumnFilter, NumberRangeColumnFilter, DefaultColumnFilter } from '../common/UserTable';
import TheaterOverviewTable from '../common/TheaterOverviewTable';

export interface ITheaterOverviewProps {
  movies: ITheaterMovie[];
  user: IUser | null;
  getTheaterMovies(user: IUser): void;
}

function TheaterOverview(props: ITheaterOverviewProps) {
  const history = useHistory();
  const { movies, user } = props;

  const [onlyShowNotPlayed, updateOnlyShowNotPlayed] = useState(false);

  useEffect(() => {
    const wrap = async () => {
      user && await props.getTheaterMovies(user);
    }
    wrap();
    // eslint-disable-next-line
  }, []);

  console.log(movies);

  const columns = [
    {
      Header: 'Movie',
      accessor: 'movName',
    },
    {
      Header: 'Duration',
      accessor: 'duration',
      Filter: NumberRangeColumnFilter,
      filter: 'between'
    },
    {
      Header: 'Release Date',
      accessor: 'movReleaseDate',
      Filter: DateRangeColumnFilter,
      filter: 'date'
    },
    {
      Header: 'Play Date',
      accessor: 'movPlayDate',
      Filter: !onlyShowNotPlayed ? DateRangeColumnFilter : DefaultColumnFilter,
      filter: !onlyShowNotPlayed ? 'date' : ''
    },
  ];

  const data = 
    movies.map((movie => {
      const hms = movie.duration.split(':');
      
      const durationMinutes = Number(hms[0]) * 60 + Number(hms[1]) + Number(hms[2]) / 60;

      return {
        ...movie,
        duration: durationMinutes,
      }
    })).filter(movie => {
      if (onlyShowNotPlayed) {
        return movie.movPlayDate === null || movie.movPlayDate === undefined;
      }
      return true;
    });
  

  return (
    <div className="flex-column">
      <h1>Theater Overview</h1>
      <div className="flex-row">
        <input
          type="checkbox"
          checked={onlyShowNotPlayed}
          onChange={(e) => updateOnlyShowNotPlayed(e.target.checked)}
        />
        <label>Only Include Not Played Movies</label>

      </div>
      <TableStyles>
        <TheaterOverviewTable
          columns={columns}
          data={data}
        />
      </TableStyles>
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
    movies: state.theaterState.movies,
    user: state.accountState.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTheaterMovies: bindActionCreators(getTheaterMovies, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TheaterOverview);
