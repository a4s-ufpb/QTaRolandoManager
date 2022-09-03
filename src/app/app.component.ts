import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'qtarolando-manager';

  routerPath: string = "";
  showNavBar: boolean = true;
  showSideBar: boolean = false;

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.getCurrentPage();
  }

  getCurrentPage(): void {
    this.router.events.subscribe((_) => {
      this.routerPath = this.location.path();
      if (this.routerPath.includes('dashboard')) {
        this.showNavBar = false;
        this.showSideBar = true;
      } else if (this.routerPath.includes('login')) {
        this.showNavBar = false;
        this.showSideBar = false;
      } else {
        this.showNavBar = true;
        this.showSideBar = false;
      }
    });
  }
}
