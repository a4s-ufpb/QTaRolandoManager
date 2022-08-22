import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { EventModel } from "src/app/models/EventModel";
import { CategoriesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event!: EventModel;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getBanner(): string {
    return this.event.imagePath == "" ? "../../../assets/images/pages/events/event-image-empty.svg" : this.event.imagePath;
  }

  getCategoryName(): string {
    return Object.values(CategoriesEnum)[this.event.categoryId];
  }

  getStartEndDate(): { startDate: string, endDate: string } {
    let formattedStartDate = formatDate(this.event.initialDate, 'dd MMM YYYY, HH:mm', 'pt-BR');
    let formattedEndDate = formatDate(this.event.finalDate, 'dd MMM YYYY, HH:mm', 'pt-BR');
    return {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  }

  goToDetails() {
    localStorage.setItem("event", JSON.stringify(this.event));
    this.router.navigate(['/evento', this.event.id]);
  }

}
