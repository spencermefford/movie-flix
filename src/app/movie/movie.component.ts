import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Movie, MovieResp } from '../../../types/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // Fetch Movie
    this.apollo
      .watchQuery<MovieResp>({
        query: gql`
          query Movie($id: ID!) {
            movie(id: $id) {
              tomatoes {
                viewer {
                  numReviews
                  meter
                  rating
                }
                dvd
                lastUpdated
              }
              genres
              cast
              languages
              directors
              countries
              id
              plot
              runtime
              numMflixComments
              poster
              title
              fullPlot
              released
              writers
              lastUpdated
              awards {
                wins
                nominations
                text
              }
              year
              imdb {
                rating
                votes
                id
              }
              type
              lasupdated
            }
          }
        `,
        variables: {
          id,
        },
      })
      .valueChanges.subscribe(result => {
        this.movie = result?.data?.movie;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
