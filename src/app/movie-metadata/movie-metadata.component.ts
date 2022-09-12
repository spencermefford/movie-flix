import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-metadata',
  templateUrl: './movie-metadata.component.html',
  styleUrls: ['./movie-metadata.component.scss'],
})
export class MovieMetadataComponent {
  @Input() label: string = '';
  @Input() value: string[] | string | undefined = [];

  formattedValue = () => {
    if (this.value && this.value.length <= 0) return 'N/A';
    return (Array.isArray(this.value) ? this.value : [this.value]).join(', ');
  };
}
