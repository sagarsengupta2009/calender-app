import { Injectable } from '@angular/core';

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

  constructor() {}

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

  saveEventsToStorage(
    events: { id: string; title: string; date: string }[] | null
  ): void {
    localStorage.setItem('allEvents', JSON.stringify(events));
  }

  includeStorageEvents(events: { id: string; title: string; date: string }[]) {
    events.forEach((event) => {
      this.setEvents(event);
    });
  }

  editEvent(editedEventId: string, editedTitle: string) {
    this.events?.forEach((item, i) => {
      if (item.id === editedEventId) {
        item.title = editedTitle;
      }
    });
    this.saveEventsToStorage(this.events);
  }

  deleteEvent(deleteEventId: string) {
    this.events?.forEach((item, i) => {
      if (item.id === deleteEventId) {
        this.events?.splice(i, 1);
      }
    });
    this.saveEventsToStorage(this.events);
  }

  changeEventDate(
    draggedEvent: { id: string; title: string; date: string },
    dropDate: number
  ) {
    this.events?.forEach((item, i) => {
      if (item.id === draggedEvent.id) {
        let dateArr = draggedEvent.date.split('/');
        dateArr[0] = dropDate.toString();
        item.date = dateArr.join('/');;
      }
    });
    this.saveEventsToStorage(this.events);
  }
}
