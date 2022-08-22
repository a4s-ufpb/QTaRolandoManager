import { Component, OnInit } from '@angular/core';
import { PagesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.css']
})
export class DashboardUsersComponent implements OnInit {
  usernames: string[] = ["Alefe", "Anderson", "Ayla", "Jobson", "Ronellyson"];
  eventsByUser: number[] = [12, 10, 3, 5, 7];
  barLabel: string = "Eventos por usuário";
  pieLabel: string = "Eventos cadastrados(%)";

  page: PagesEnum = PagesEnum.DashboardUsers;

  constructor() { }

  ngOnInit(): void {
  }

}
