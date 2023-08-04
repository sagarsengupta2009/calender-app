import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeMonthService {
  setDateOnChange = new Subject<{monthIdx: number, yearNumber: number}>();
  constructor() {}

  checkLeapYear(year: number): boolean {
    if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
      return true;
    } else {
      return false;
    }
  }

  daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  getDayCountForMonth(month: number, year: number): number {
    let dateCount = this.daysInMonth(month, year);
    return dateCount;
  }

  getDateCount(monthIdx: number, year: number): number {
    let dateInCurrMonth = this.getDayCountForMonth(monthIdx, year);
    return dateInCurrMonth;
  }
}
