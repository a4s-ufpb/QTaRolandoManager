import { formatDate, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';
import { CategoriesEnum } from 'src/app/utils/constants';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event!: EventModel;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.event = JSON.parse(localStorage.getItem('event')!) as EventModel;
  }

  goBack() {
    this.location.back();
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

  copyCurrentUrl() {
    // const toast = document.querySelector(".toast");
    // const closeIcon = toast!.querySelector(".eva-close-outline");
    // const progress = toast!.querySelector(".progress");

    // toast?.classList.add("active");
    // progress?.classList.add("active");

    // setTimeout(() => {
    //   toast?.classList.remove("active");
    // }, 5000);

    // setTimeout(() => {
    //   progress?.classList.remove("active");
    // }, 5500);

    // closeIcon?.addEventListener("click", () => {
    //   toast?.classList.remove("active");

    //   setTimeout(() => {
    //     progress?.classList.remove("active");
    //   }, 500);
    // });

    const tooltip = document.querySelector('#copy_tooltip');
    tooltip?.classList.add('active');

    setTimeout(function () {
      tooltip?.classList.remove('active');
    }, 1000);

    navigator.clipboard.writeText(window.location.href);
  }

}
