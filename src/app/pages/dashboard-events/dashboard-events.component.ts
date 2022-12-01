import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.css']
})
export class DashboardEventsComponent implements OnInit {

  usernames: string[] = ["Arte, Cinema e Lazer", "Congressos e Palestras", "Cursos e Workshops", "Esportes", "Festas e Shows"];
  eventsByUser: number[] = [12, 10, 3, 5, 7];
  barLabel: string = "Eventos por Categoria";
  pieLabel: string = "Eventos cadastrados(%)";

  constructor() { }

  ngOnInit(): void {
  }

}
