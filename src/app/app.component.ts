import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'movie-flix';
  genres = [];
  genre = '';
  loading = true;
  error: any;
  isCollapsed = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get Query Param
    this.route.queryParams.subscribe(({ genre }) => {
      this.genre = genre;
    });

    // Fetch Genres
    this.apollo
      .watchQuery({
        query: gql`
          query Genres {
            genres
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.genres = result?.data?.genres;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  setGenre(genre: string): void {
    this.router.navigate(['/'], { queryParams: { genre } });
  }
}
