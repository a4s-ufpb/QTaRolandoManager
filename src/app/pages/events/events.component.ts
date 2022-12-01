import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { EventsService } from './../../services/events.service';
import { EventModel } from "src/app/models/EventModel";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CategoriesEnum, DatesEnum, ModalitiesEnum } from 'src/app/utils/constants';
import { setQueryParms, getCategories, getModalities } from "src/app/utils/helpers";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {

  @ViewChild('modality_option') modalitiesOption!: ElementRef;
  @ViewChild('modality_toggle') modalitiesToggle!: ElementRef;
  @ViewChild('modality_menu') modalitiesMenu!: ElementRef;
  @ViewChild('modality_seleted') modalitySelectedElement!: ElementRef;

  @ViewChild('date_option') dateOption!: ElementRef;
  @ViewChild('date_toggle') dateToggle!: ElementRef;
  @ViewChild('date_menu') dateMenu!: ElementRef;
  @ViewChild('date_seleted') dateSelectedElement!: ElementRef;

  searchStr: string = "";
  categorySelected: number = 0;
  modalitySelected: number = 0;
  dateTypeSelected: number = 0;

  events: EventModel[] = [];
  events$: Subject<void> = new Subject<void>();

  pageSize: number = 24;
  page: number = 1;
  totalItems: number = 0;

  categories = getCategories();
  modalities = getModalities();

  selectCategory = (category: string) => {
    const indexOfS = Object.values(CategoriesEnum).indexOf(category as unknown as CategoriesEnum);
    this.categorySelected = indexOfS;

    const queryParams: Params = { ct: indexOfS == 0 ? null : this.getKeyCategorySelected() };
    setQueryParms(this.router, this.activatedRoute, queryParams);
    this.getEvents();
  }

  constructor(private renderer: Renderer2, private service: EventsService, private router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.configureSearch();

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.modalitiesToggle.nativeElement && e.target !== this.modalitiesMenu.nativeElement) {
        if (this.modalitiesOption.nativeElement.classList.contains("active")) {
          this.modalitiesOption.nativeElement.classList.remove("active");
        }
      } if (e.target !== this.dateToggle.nativeElement && e.target !== this.dateMenu.nativeElement) {
        if (this.dateOption.nativeElement.classList.contains("active")) {
          this.dateOption.nativeElement.classList.remove("active");
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.events$.next();
    this.events$.complete()
  }

  configureSearch(): void {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      let title = queryParams['s'];
      let category = queryParams['ct'];
      let modality = queryParams['md'];
      let dateType = queryParams['dt'];

      this.searchStr = title ?? "";
      this.categorySelected = category ? Object.keys(CategoriesEnum).indexOf(category as unknown as CategoriesEnum) : 0;
      this.modalitySelected = modality ? Object.keys(ModalitiesEnum).indexOf(modality as unknown as ModalitiesEnum) : 0;
      this.dateTypeSelected = dateType ? Object.keys(DatesEnum).indexOf(dateType as unknown as DatesEnum) : 0;

      this.categorySelected = this.categorySelected == -1 ? 0 : this.categorySelected;
      this.modalitySelected = this.modalitySelected == -1 ? 0 : this.modalitySelected;
      this.dateTypeSelected = this.dateTypeSelected == -1 ? 0 : this.dateTypeSelected;

      this.getEvents();
    })

  }

  getEvents(): void {
    this.service.listEvents(this.searchStr, this.categorySelected, this.getModalitySelected(), this.getDateTypeSelected(), "", "")
      .pipe(takeUntil(this.events$)).subscribe(data => {
        this.events = data['content'];
        this.totalItems = data['totalElements'];
      });
  }

  btnSearch(): void {
    const queryParams: Params = { s: this.searchStr == "" ? null : this.searchStr };
    setQueryParms(this.router, this.activatedRoute, queryParams);
    this.getEvents();
  }

  openModalitiesFilter() {
    this.modalitiesOption.nativeElement.classList.toggle("active");
  }

  getCategorySelected(): string {
    return Object.values(CategoriesEnum)[this.categorySelected];
  }

  getKeyCategorySelected(): string {
    return Object.keys(CategoriesEnum)[this.categorySelected];
  }

  getModalitySelected(): string {
    return Object.values(ModalitiesEnum)[this.modalitySelected];
  }

  selectModality(modality: string) {
    const indexOfS = Object.values(ModalitiesEnum).indexOf(modality as unknown as ModalitiesEnum);

    this.modalitySelected = indexOfS;

    if (modality == '') {
      this.modalitySelectedElement.nativeElement.innerText = 'Modalidade';
    } else {
      this.modalitySelectedElement.nativeElement.innerText = Object.values(ModalitiesEnum)[this.modalitySelected];
    }

    const queryParams: Params = { md: indexOfS == 0 ? null : this.getModalitySelected() };
    setQueryParms(this.router, this.activatedRoute, queryParams);
    this.getEvents();
  }

  openDatesFilter() {
    this.dateOption.nativeElement.classList.toggle("active");
  }

  getDatesValues(): Array<string> {
    const keys = Object.keys(DatesEnum);
    return keys.map(el => Object(DatesEnum)[el]).filter(value => value != '');
  }

  getDateTypeSelected(): string {
    return Object.keys(DatesEnum)[this.dateTypeSelected];
  }

  getDateSelected(): string {
    return Object.values(DatesEnum)[this.dateTypeSelected];
  }

  selectDate(date: string) {
    const indexOfS = Object.values(DatesEnum).indexOf(date as unknown as DatesEnum);

    this.dateTypeSelected = indexOfS;
    if (date == '') {
      this.dateSelectedElement.nativeElement.innerText = 'Data';
    } else {
      this.dateSelectedElement.nativeElement.innerText = Object.values(DatesEnum)[this.dateTypeSelected];
    }

    const queryParams: Params = { dt: indexOfS == 0 ? null : this.getDateTypeSelected() };
    setQueryParms(this.router, this.activatedRoute, queryParams);
    this.getEvents();
  }

}
