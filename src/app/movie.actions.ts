import { createAction, props } from '@ngrx/store';
import { Movie } from './movie.model';

export const loadMovies = createAction('[Movie List] Load Movies');
export const loadMoviesSuccess = createAction(
  '[Movie List] Load Movies Success',
  props<{ movies: Movie[] }>()
);
export const loadMoviesFailure = createAction(
  '[Movie List] Load Movies Failure',
  props<{ error: any }>()
);
export const selectMovie = createAction(
  '[Movie List] Select Movie',
  props<{ id: string }>()
);
