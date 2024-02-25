import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '715289b';
  private apiUrl = 'http://www.omdbapi.com?apikey=715289b';

  constructor(private http: HttpClient) { }

  getMoviesUrl(query: string, page: number): string {
    return `${this.apiUrl}&s=${query}&page=${page}`;
  }

  searchMovies(query: string, page: number): Observable<any> {
    const url = this.getMoviesUrl(query, page);
    return this.http.get(url);
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}&i=${id}`;
    return this.http.get(url);
  }
}
