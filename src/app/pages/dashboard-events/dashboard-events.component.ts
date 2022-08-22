import { Component, OnInit } from '@angular/core';
import { PagesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.css']
})
export class DashboardEventsComponent implements OnInit {

  page: PagesEnum = PagesEnum.DashboardEvents;

  constructor() { }

  ngOnInit(): void {
  }

}
