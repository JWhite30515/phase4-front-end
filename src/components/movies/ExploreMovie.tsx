import React, { useEffect, useState } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import '../../css/common.css';
import 'react-datepicker/dist/react-datepicker.css';

import IRootState from '../../redux/state/RootState';
import { getMoviePlays } from '../../redux/actions/movieActions';
import { IMoviePlay } from '../../redux/state/MovieState';

import ExploreMovieTable from '../common/ExploreMovieTable';
import { TableStyles, SelectColumnFilter, DateRangeColumnFilter } from '../common/UserTable';
import { ICreditCard } from '../../redux/state/UserState';
import { IUser } from '../../redux/state/AccountState';
import { viewMovie } from '../../redux/actions/movieActions';

export interface IExploreMovieProps {
  user: IUser | null;
  creditCards: ICreditCard[];
  moviePlays: IMoviePlay[];
  getMoviePlays(): void;
  viewMovie(moviePlay: IMoviePlay, cardNum: string, user: IUser): void;
}

function ExploreMovie(props: IExploreMovieProps) {
  useEffect(() => {
    const wrap = async () => {
      await props.getMoviePlays();
    }
    wrap();
  }, []);

  const [creditCard, updateCreditCard] = useState({ label: '', value: '' });

  const { creditCards, moviePlays, user} = props;

  const history = useHistory();

  const columns = [
    {
      id: 'selection',
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: any) => (
        <div>
          <input type="checkbox" {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    {
      Header: 'Movie',
      accessor: 'movName',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: 'Theater',
      accessor: 'thName',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Company',
      accessor: 'comName',
      Filter: SelectColumnFilter,
      filter: 'includes'
    },
    {
      Header: 'Play Date',
      accessor: 'movPlayDate',
      Filter: DateRangeColumnFilter,
      filter: 'date'
    },
  ];

  return (
    <div className="flex-column">
      <h1>Explore Movie</h1>
      <TableStyles>
        <ExploreMovieTable
          columns={columns}
          data={moviePlays.map(moviePlay => {
            const { thStreet, thState, thCity, thName, thZipcode } = moviePlay.theater;
            const { movPlayDate } = moviePlay;
            return {
              ...moviePlay,
              thName: thName,
              address: `${thStreet}, ${thCity}, ${thState} ${thZipcode}`,
              movPlayDate
            }
          })}
          cardNumber={creditCard.value}
          user={user}
          viewMovie={props.viewMovie}
        />
      </TableStyles>
      Credit Card<br />
      <Select
        value={creditCard}
        options={creditCards.map(card => ({ value: card.creditCardNum, label: card.creditCardNum }))}
        onChange={option => {
          const opt = option as { value: string, label: string };
          return opt && updateCreditCard(opt);
        }}
        styles={{
          input: (provided, state) => ({
            width: '100px'
          })
        }}
      />
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
    moviePlays: state.movieState.moviePlays,
    creditCards: state.accountState.creditCards,
    user: state.accountState.user,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMoviePlays: bindActionCreators(getMoviePlays, dispatch),
    viewMovie: bindActionCreators(viewMovie, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreMovie);