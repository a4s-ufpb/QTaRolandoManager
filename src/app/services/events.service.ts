import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { EventModel } from '../models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly EVENTS_API = `${environment.API}/events/`;

  constructor(private http: HttpClient) { }

  listEvents(title?: string, categoryId?: number, modality?: string, dateType?: string, initialDate?: string, finalDate?: string) {
    let params = new HttpParams();

    if (title) (params = params.append('title', title!));
    if (categoryId) (params = params.append('categoryId', categoryId!));
    if (modality) (params = params.append('modality', modality));
    if (dateType) (params = params.append('dateType', dateType!));
    if (initialDate) (params = params.append('initialDate', initialDate!));
    if (finalDate) (params = params.append('finalDate', finalDate!));

    return this.http.get<any>(this.EVENTS_API + 'filter', { params: params });
  }

  getById(id: string) {
    return this.http.get<EventModel>(this.EVENTS_API + id);
  }

  create(event: EventModel) {
    return this.http.post(this.EVENTS_API, event)
      .pipe(take(1));
  }

  update(id: string, event: EventModel) {
    return this.http.put(this.EVENTS_API + id, event)
      .pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(this.EVENTS_API + id);
  }
}
