import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  genre = '';

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get Query Param
    this.route.queryParams
      .subscribe(({genre}) => {
        this.genre = genre;
      }
    );
  }
}
