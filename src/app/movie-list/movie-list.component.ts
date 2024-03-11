import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  searchQuery: string = '';
  totalResults: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 1000;
  isLoading: boolean = false;
  filteredMovies: Movie[] = [];
  displayMovieTitle: (value: any) => string = (value: any) => ''; // Initialize with a default function

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.isLoading = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(
      (response: any) => {
        if (response && response.Search) {
          this.movies = this.movies.concat(response.Search);
          this.totalResults = parseInt(response.totalResults);
          // Update filteredMovies on loadMovies
          this.filteredMovies = this._filter(this.searchQuery);
          this.currentPage++;
        }
        this.isLoading = false;
      },
      (error) => {
        console.log('Error fetching movies:', error);
        this.isLoading = false;
      }
    );
  }

  private _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    return this.movies.filter(movie => movie.Title.toLowerCase().includes(filterValue));
  }

  searchMovies() {
    this.currentPage = 1;
    this.movies = [];
    this.loadMovies();
  }

  onSearchQueryChanged(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.filteredMovies = this._filter(this.searchQuery);
  }
  

  navigateToMovieDetail(movieId: string) {
    this.router.navigate(['/movie', movieId]);
  }
}
