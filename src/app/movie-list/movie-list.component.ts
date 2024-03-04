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
  movies: Movie[] = []; // Array untuk menyimpan daftar film
  searchQuery: string = '';
  totalResults: number = 0;
  currentPage: number = 1; // Inisiasi Halaman
  itemsPerPage: number = 1000; // Jumlah film per halaman
  isLoading: boolean = false;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  // Memuat daftar film
  loadMovies() {
    this.isLoading = true;
    this.movieService.searchMovies(this.searchQuery, this.currentPage).subscribe(
      (response: any) => {
        // Memastikan respons memiliki properti Search yang berisi daftar film
        if (response && response.Search) {
          this.movies = this.movies.concat(response.Search);
          // Memperbarui hasil
          this.totalResults = parseInt(response.totalResults);
          // Memuat halaman berikutnya
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

  // Mencari film berdasarkan kueri
  searchMovies() {
    this.currentPage = 1; // Reset page when performing a new search
    this.movies = []; // Clear existing movies
    this.loadMovies();
  }

  // Scroll Halaman
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const container = event.target.documentElement;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollPosition = scrollTop + clientHeight;

    if (scrollPosition >= scrollHeight && !this.isLoading) {
      this.loadMovies();
    }
  }

  //...
  navigateToMovieDetail(movieId: string) {
    this.router.navigate(['/movie', movieId]);
  }
}
