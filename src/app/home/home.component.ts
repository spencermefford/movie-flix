import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  genre = '';

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get Query Param
    this.route.queryParams.subscribe(({ genre }) => {
      this.genre = genre;

      // Fetch Genres
      this.apollo
        .watchQuery({
          query: gql`
            query Movies($genre: String!) {
              movies(genre: $genre) {
                released
                title
              }
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          this.genres = result?.data?.genres;
          this.loading = result.loading;
          this.error = result.error;

          if (!this.genre) {
            this.router.navigate(['/'], {
              queryParams: { genre: this.genres[0] },
            });
          }
        });
    });
  }
}
