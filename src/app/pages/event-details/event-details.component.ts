import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {

  event$!: Observable<EventModel>;

  constructor(
    private location: Location,
    private service: EventsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.event$ = this.service.getById(id);
  }

  goBack() {
    this.location.back();
  }

  getStartEndDate(event: EventModel): { startDate: string, endDate: string } {
    let formattedStartDate = formatDate(event.initialDate, 'dd MMM YYYY, HH:mm', 'pt-BR');
    let formattedEndDate = formatDate(event.finalDate, 'dd MMM YYYY, HH:mm', 'pt-BR');
    return {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  }

  copyCurrentUrl() {
    const tooltip = document.querySelector('#copy_tooltip');
    tooltip?.classList.add('active');

    setTimeout(function () {
      tooltip?.classList.remove('active');
    }, 1000);

    navigator.clipboard.writeText(window.location.href);
  }

}
