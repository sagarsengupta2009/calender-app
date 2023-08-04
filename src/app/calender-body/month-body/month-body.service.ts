import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthBodyService {
  dateCountChange = new Subject<{dateCount: number, monthIdx: number, yearNumber: number}>();
  days: number[] = [];
  daysObj: {day: number, events: {id: string, title: string, date: string}[]}[] = [];

  constructor() { }

  getDays(dateCount: number): {day: number, events: {id: string, title: string, date: string}[]}[] {
    for(let i=1; i<=dateCount; i++) {
      this.daysObj.push({day: i, events: []});
    }
    return this.daysObj;
  }

}
