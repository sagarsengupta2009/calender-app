import { Component, OnInit } from '@angular/core';
import { CalenderBodyService } from '../calender-body.service';
import { ChangeMonthService } from './change-month.service';
import { MonthBodyService } from '../month-body/month-body.service';

@Component({
  selector: 'app-change-month',
  templateUrl: './change-month.component.html',
  styleUrls: ['./change-month.component.css']
})
export class ChangeMonthComponent implements OnInit {

  month!: any;
  year!: number;
  dateCount!: number;

  constructor(
    private readonly calenderBodyService: CalenderBodyService,
    private readonly changeMonthService: ChangeMonthService,
    private readonly monthBodyService: MonthBodyService
  ) { }

  ngOnInit(): void {
    let months = this.calenderBodyService.getShortMonths();
    let currDate = new Date();
    let monthIdx = currDate.getUTCMonth() + 1;
    this.month = months.find((month, idx) => {
      return idx === monthIdx-1;
    }); 
    this.year = currDate.getUTCFullYear();
    this.dateCount = this.changeMonthService.getDateCount(monthIdx, this.year);
    this.monthBodyService.dateCountChange.next({ dateCount: this.dateCount, monthIdx: monthIdx, yearNumber: this.year });
  }

  // getDateCount(monthIdx: number, year: number): number {
  //   let dateInCurrMonth = this.changeMonthService.getDayCountForMonth(monthIdx, year);
  //   return dateInCurrMonth;
  // }
  
  changeMonthForwardDir(months: string[]): void {
    for (const [i, month] of months.entries()) {
      if(month === this.month) {
        if(i === months.length-1) {
          this.month = months[i-months.length+1];
          break;
        } else {
          this.month = months[i+1];
          break;
        }
      }
    }
  }

  rightArrowClick(event: Event): void {
    let months = this.calenderBodyService.getShortMonths();
    this.changeMonthForwardDir(months);
    if(this.month === 'Jan') {
      this.year += 1;
    }
    let monthIdx = months.indexOf(this.month);
    this.dateCount = this.changeMonthService.getDateCount(monthIdx+1, this.year);
    this.changeMonthService.setDateOnChange.next({ monthIdx: monthIdx+1, yearNumber: this.year });
    this.monthBodyService.dateCountChange.next({ dateCount: this.dateCount, monthIdx: monthIdx, yearNumber: this.year });
  }

  changeMonthBackwardDir(months: string[]): void {
    for (const [i, month] of months.entries()) {
      if(month === this.month) {
        if(i === 0) {
          this.month = months[months.length-1];
          break;
        } else {
          this.month = months[i-1];
          break;
        }
      }
    }
  }

  leftArrowClick(event: MouseEvent): void {
    let months = this.calenderBodyService.getShortMonths();
    this.changeMonthBackwardDir(months);
    if(this.month === 'Dec') {
      this.year -= 1;
    }
    let monthIdx = months.indexOf(this.month);
    this.dateCount = this.changeMonthService.getDateCount(monthIdx+1, this.year);
    this.changeMonthService.setDateOnChange.next({ monthIdx: monthIdx+1, yearNumber: this.year });
    this.monthBodyService.dateCountChange.next({ dateCount: this.dateCount, monthIdx: monthIdx, yearNumber: this.year });
  }
}
