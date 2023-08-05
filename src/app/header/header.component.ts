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
    this.isDateValid = this.headerService.validateDate(form.value.date);
    this.isTitleValid = this.headerService.validateTitle(form.value.title);
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
  };

  openEventDialog(): void {
    const evenDialog = document.getElementById('eventModal');
    if (evenDialog) {
      evenDialog.style.display = 'block';
    }
  };

  closeEventDialog(): void {
    const evenDialog = document.getElementById('eventModal');
    if (evenDialog) {
      evenDialog.style.display = 'none';
    }
  };

  resetForm(): void {
    this.eventForm.reset();
  };
}
