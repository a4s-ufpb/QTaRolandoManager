import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from "src/app/models/EventModel";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event!: EventModel;

  showModal: boolean = false;

  deleteEvent = () => {
    this.service.delete(this.event.id!).subscribe({
      next: (data) => { },
      error: (err) => { },
      complete: () => {
        window.location.reload();
      }
    })
  };

  closeModal = () => {
    this.showModal = false;
  }

  constructor(private router: Router, private service: EventsService) { }

  ngOnInit(): void {
  }

  checkShowOptions(): boolean {
    return this.router.url.includes('dashboard') || this.router.url.includes('manager');
  }

  getBanner(): string {
    return (this.event.imagePath == null || this.event.imagePath == "") ? "../../../assets/images/pages/events/event-image-empty.svg" : this.event.imagePath;
  }

  getStartEndDate(): { startDate: string, endDate: string } {
    let formattedStartDate = formatDate(this.event.initialDate, 'dd MMM YYYY, HH:mm', 'pt-BR');
    let formattedEndDate = formatDate(this.event.finalDate, 'dd MMM YYYY, HH:mm', 'pt-BR');
    return {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  }

  goDetails(): void {
    this.router.navigate([(this.router.url), encodeURI(this.event.title), this.event.id]);
  }

  goEdit(): void {
    this.router.navigate(['manager/editar-evento', encodeURI(this.event.title), this.event.id])
  }

  openModal(): void {
    this.showModal = !this.showModal;
  }
}
