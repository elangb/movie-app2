import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: string | undefined;
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      if (this.movieId) {
        this.getMovieDetails();
      }
    });
  }

  getMovieDetails() {
    if (this.movieId) {
      this.movieService.getMovieDetails(this.movieId).subscribe(
        (response: any) => {
          this.movie = response;
        },
        (error) => {
          console.log('Error fetching movie details:', error);
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/movies']);
  }
}
