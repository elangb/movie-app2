import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '715289b';
  private apiUrl = 'http://www.omdbapi.com?apikey=715289b&s=Batman&page=1';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> { // Change the return type to Observable<any>
    const url = `${this.apiUrl}&apikey=${this.apiKey}`;
    return this.http.get(url);
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${this.apiUrl}&apikey=${this.apiKey}&i=${id}`;
    return this.http.get(url);
  }
}
