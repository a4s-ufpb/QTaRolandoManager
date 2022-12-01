import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OwlDateTimeIntl } from '@danielmoncada/angular-datetime-picker';

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

  constructor(private router: Router, private location: Location, private owlDateTimeIntl: OwlDateTimeIntl) { }

  ngOnInit(): void {
    this.loadBtnI18n();
    this.getCurrentPage();
  }

  getCurrentPage(): void {
    this.router.events.subscribe((_) => {
      this.routerPath = this.location.path();
      if (this.routerPath.includes('dashboard') || this.routerPath.includes('manager')) {
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

  public loadBtnI18n(): void {
    this.owlDateTimeIntl.setBtnLabel = 'Selecionar';
    this.owlDateTimeIntl.cancelBtnLabel = 'Cancelar';
    this.owlDateTimeIntl.rangeFromLabel = 'Início';
    this.owlDateTimeIntl.rangeToLabel = 'Fim';
  }
}
