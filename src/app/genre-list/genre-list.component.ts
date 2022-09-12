import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { GenresResp } from '../../../types/common';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
})
export class GenreListComponent implements OnInit {
  genres: string[] = [];
  loading = true;
  error: any;
  genre = '';

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch Genres
    this.apollo
      .watchQuery<GenresResp>({
        query: gql`
          query Genres {
            genres
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.genres = result?.data?.genres;
        this.loading = result.loading;
        this.error = result.error;
      });

    this.route.queryParams.subscribe(({ genre }) => {
      this.genre = genre;
    });
  }

  setGenre(genre: string): void {
    this.router.navigate(['/'], { queryParams: { genre } });
  }
}
