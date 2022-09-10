import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-flix';
  genres = [];
  loading= true;
  error:any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
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
}
