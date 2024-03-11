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

// untuk mengelola state film
export const movieReducer = createReducer(
  initialState,
  on(MovieActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies, // Memperbarui daftar film dalam state
  })),
  // pemilihan film
  on(MovieActions.selectMovie, (state, { id }) => ({
    ...state,
    selectedMovieId: id, // memilih berdasarkan ID
  }))
);
