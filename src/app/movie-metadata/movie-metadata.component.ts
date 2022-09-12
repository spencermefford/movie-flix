import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-metadata',
  templateUrl: './movie-metadata.component.html',
  styleUrls: ['./movie-metadata.component.scss'],
})
export class MovieMetadataComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() label: string = '';
  @Input() value: string[] | string | undefined = [];

  formattedValue = () =>
    (Array.isArray(this.value) ? this.value : [this.value]).join(', ');
}
