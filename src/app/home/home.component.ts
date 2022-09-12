import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Movie, MoviesResp } from '../../../types/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  genre: string | null = null;
  movies: Movie[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get Query Param
    this.route.queryParams.subscribe(({ genre }) => {
      this.genre = genre;

      // Fetch Genres
      this.apollo
        .watchQuery<MoviesResp>({
          query: gql`
            query Movies($genre: String) {
              movies(genre: $genre) {
                id
                title
                genres
                languages
                poster
                imdb {
                  rating
                }
                tomatoes {
                  critic {
                    meter
                  }
                  viewer {
                    meter
                  }
                }
              }
            }
          `,
          variables: {
            genre,
          },
        })
        .valueChanges.subscribe(result => {
          this.movies = result?.data.movies;
          this.loading = result.loading;
          this.error = result.error;
        });
    });
  }
}
