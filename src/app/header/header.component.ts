import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeaderService } from './header.service';
import { CalenderBodyService } from '../calender-body/calender-body.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('frm') eventForm!: NgForm;
  appTitle = 'My Calender';
  eventTitle: string = '';
  eventDate: string = '';
  isDateValid: boolean = false;
  isTitleValid: boolean = false;
  isFormValid: boolean = false;
  addedEvent: { title: string; date: string } = { title: '', date: '' };
  constructor(
    private readonly calenderBodyService: CalenderBodyService,
    private readonly headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.isDateValid = this.validateDate(form.value.date);
    this.isTitleValid = this.validateTitle(form.value.title);
    if(this.isDateValid && this.isTitleValid) {
      let eventObj = {
        id: this.headerService.generateGUID(),
        title: form.value.title,
        date: form.value.date,
      };
      this.calenderBodyService.setEvents(eventObj);
      this.calenderBodyService.saveEventsToStorage(this.calenderBodyService.getEvents());
      this.headerService.addEventToDate.next(eventObj);
      this.closeEventDialog();
    } else if(!this.isDateValid) {
      alert("Please enter date in dd/mm/yyyy format!")
    }
  }

  openEventDialog(): void {
    const evenDialog = document.getElementById('eventModal');
    if (evenDialog) {
      evenDialog.style.display = 'block';
    }
  }

  closeEventDialog(): void {
    const evenDialog = document.getElementById('eventModal');
    if (evenDialog) {
      evenDialog.style.display = 'none';
    }
  }

  validateTitle(title: string): boolean {
    if(!title) {
      return false;
    }
    return true;
  }

  validateDate(date: string): boolean {
    let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

    if (date.match(dateformat)) {
      let operator = date.split('/');
      let datepart: any[] = [];

      if (operator.length > 1) {
        datepart = date.split('/');
      }

      let day = parseInt(datepart[0]);
      let month = parseInt(datepart[1]);
      let year = parseInt(datepart[2]);
      let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
      if(month > 12) {
        return false;
      }

      if (month == 1 || month > 2) {
        if (day > ListofDays[month - 1]) {
          return false;
        }
      } else if (month == 2) {
        let leapYear = false;
        if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
        if (leapYear == false && day >= 29) {
          return false;
        } else if (leapYear == true && day > 29) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.eventForm.reset();
  }
}
