import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/movie')) {
          this.isCollapsed = true;
        } else if (event.url === '/' || event.url.startsWith('/?genre')) {
          this.isCollapsed = false;
        }
      }
    });
  }
}
