import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { CategoriesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-event-card-details',
  templateUrl: './event-card-details.component.html',
  styleUrls: ['./event-card-details.component.css']
})
export class EventCardDetailsComponent implements OnInit {

  @Input() event!: EventModel;

  constructor() { }

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

}
