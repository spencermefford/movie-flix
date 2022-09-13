import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { formatDuration, intervalToDuration } from 'date-fns';
import { Movie, MovieResp } from '../../../types/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  formattedRuntime = '';
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
              id
              rated
              genres
              cast
              languages
              directors
              countries
              plot
              runtime
              poster
              title
              fullPlot
              writers
              year
              imdb {
                rating
              }
              tomatoes {
                viewer {
                  meter
                }
                critic {
                  meter
                }
              }
            }
          }
        `,
        variables: {
          id,
        },
      })
      .valueChanges.subscribe(result => {
        this.movie = result?.data?.movie;
        const duration = intervalToDuration({
          start: 0,
          end: (this.movie?.runtime ?? 0) * 1000 * 60,
        });
        this.formattedRuntime = formatDuration(duration);
        this.loading = result.loading;
        this.error = result.error;
      });

    const duration = intervalToDuration({ start: 0, end: 61 * 1000 * 60 });
    console.log(formatDuration(duration));
  }
}
