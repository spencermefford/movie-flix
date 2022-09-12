import { Component, Input } from '@angular/core';
import { Movie } from '../../../types/common';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.scss'],
})
export class MovieReviewsComponent {
  @Input() movie: Movie | null = null;
}
