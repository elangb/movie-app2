import { createReducer, on } from '@ngrx/store';
import { Movie } from './movie.model';
import * as MovieActions from './movie.actions';

export interface MovieState {
  movies: Movie[];
  selectedMovieId: string | null;
}

export const initialState: MovieState = {
  movies: [],
  selectedMovieId: null,
};

export const movieReducer = createReducer(
  initialState,
  on(MovieActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
  })),
  on(MovieActions.selectMovie, (state, { id }) => ({
    ...state,
    selectedMovieId: id,
  }))
);
