import { Injectable } from '@angular/core';
import { ApiEndPointService } from '../shared/service/api-end-point.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalenderBodyService {
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  monthsShort: string[] = [];
  events: { id: string; title: string; date: string }[] = [];
  event: { id: string; title: string; date: string } = {
    id: '',
    title: '',
    date: '',
  };
  constructor(public apiEndPoint: ApiEndPointService) {}

  getEvents(): { id: string; title: string; date: string }[] {
    return this.events;
  }

  setEvents(event: { id: string; title: string; date: string }): void {
    this.events.push(event);
  }

  getMonths(): string[] {
    return this.months;
  }

  getShortMonths(): string[] {
    this.monthsShort = this.getMonths().map((month: string) => {
      return month.substring(0, 3);
    });
    return this.monthsShort;
  }

  saveEventToStorage(
    event: { id: string; title: string; date: string } | null
  ) {
    // localStorage.setItem('allEvents', JSON.stringify(events));
    return this.apiEndPoint.saveNewEvent(event);
    // return this.http.post<{ title: string; date: string }>('http://localhost:3000/', events);
  }

  includeStorageEvents(events: { id: string; title: string; date: string }[]) {
    events.forEach((event) => {
      this.setEvents(event);
    });
  }

  editEvent(editedEventId: string, editedEventBody: any) {
    this.events?.forEach((item, i) => {
      if (item.id === editedEventId) {
        item.title = editedEventBody.title;
      }
    });
  }

  deleteEvent(deleteEventId: string) {
    this.events?.forEach((item, i) => {
      if (item.id === deleteEventId) {
        this.events?.splice(i, 1);
      }
    });
    // this.saveEventToStorage(this.event);
  }

  changeEventDate(
    draggedEvent: { id: string; title: string; date: string },
    dropDate: number
  ) {
    this.events?.forEach((item, i) => {
      if (item.id === draggedEvent.id) {
        let dateArr = draggedEvent.date.split('/');
        dateArr[0] = dropDate.toString();
        item.date = dateArr.join('/');
      }
    });
    this.saveEventToStorage(this.event);
  }
}
