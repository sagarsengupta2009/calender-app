import { Component, Input, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { MonthBodyService } from './month-body.service';
import { CalenderBodyService } from '../calender-body.service';
import { ChangeMonthService } from '../change-month/change-month.service';
import { HeaderService } from 'src/app/header/header.service';
import { NgForm } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-month-body',
  templateUrl: './month-body.component.html',
  styleUrls: ['./month-body.component.css'],
})
export class MonthBodyComponent implements OnInit,OnDestroy {
  @ViewChild('form') editEventForm!: NgForm;
  @Input() allEvents!: { id: string; title: string; date: string }[] | null;
  private subscriptions: Subscription = new Subscription();
  dateCount!: number;
  year!: number;
  month!: any;
  event: { id: string; title: string; date: string } = {
    id: '',
    title: '',
    date: '',
  };
  daysObj: {
    day: number;
    events: { id: string; title: string; date: string }[];
  }[] = [];
  rightPanelStyle: any = {};
  index!: number;
  eventId: string = '';
  isDateValid: boolean = false;
  isTitleValid: boolean = false;

  constructor(
    private readonly monthBodyService: MonthBodyService,
    private readonly changeMonthService: ChangeMonthService,
    private readonly calenderBodyService: CalenderBodyService,
    private readonly headerService: HeaderService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    let months = this.calenderBodyService.getShortMonths();
    let currDate = new Date();
    let monthIdx = currDate.getUTCMonth() + 1;
    this.month = months.find((month, idx) => {
      return idx === monthIdx - 1;
    });
    this.year = currDate.getUTCFullYear();
    let dateCount = this.changeMonthService.getDateCount(monthIdx, this.year);
    this.daysObj = this.monthBodyService.getDays(dateCount);

    if (this.allEvents) {
      for (const [i, event] of this.allEvents.entries()) {
        let dateArr = event.date.split('/');
        let date = Number(dateArr[0]);
        let month = Number(dateArr[1]);
        let year = Number(dateArr[2]);
        if (this.year === year) {
          if (monthIdx === month) {
            if (this.daysObj[date - 1]) {
              this.daysObj[date - 1].events.push(event);
            }
          }
        }
      }
    }

    this.subscriptions.add(
      this.changeMonthService.setDateOnChange.subscribe((monthYearObj) => {
        this.year = monthYearObj.yearNumber;
        monthIdx = monthYearObj.monthIdx;
      })
    );

    this.subscriptions.add(
      this.monthBodyService.dateCountChange.subscribe((dateMonthObj) => {
        this.daysObj.length = 0;
        this.daysObj = this.monthBodyService.getDays(dateMonthObj.dateCount);
        for (const [i, event] of this.calenderBodyService.events.entries()) {
          let dateArr = event.date.split('/');
          let date = Number(dateArr[0]);
          let month = Number(dateArr[1]);
          let year = Number(dateArr[2]);
          if (dateMonthObj.yearNumber === year) {
            if (dateMonthObj.monthIdx + 1 === month) {
              if (this.daysObj[date - 1]) {
                this.daysObj[date - 1].events.push(event);
              }
            }
          }
        }
      })
    );

    this.subscriptions.add(
      this.headerService.addEventToDate.subscribe((eventObj) => {
        for (const [i, day] of this.daysObj.entries()) {
          let dateArr = eventObj.date.split('/');
          let date = Number(dateArr[0]);
          let month = Number(dateArr[1]);
          let year = Number(dateArr[2]);
          if (this.year === year) {
            if (monthIdx === month) {
              if (day.day === date) {
                day.events.push(eventObj);
              }
            }
          }
        }
      })
    );
      
    this.renderer.listen('window', 'click',(e:Event)=>{ 
      this.closeContextMenu();
    });

    this.closeContextMenu();
  };

  detectRightMouseClick(
    $event: MouseEvent,
    event: { id: string; title: string; date: string },
    i: number
  ) {
    this.event = event;
    this.eventId = event.id;
    this.index = i;
    if ($event.which === 3) {
      this.rightPanelStyle = {
        display: 'block',
        position: 'absolute',
        'left.px': $event.clientX - 90,
        'top.px': $event.clientY - 90,
      };
    }
  };

  closeContextMenu() {
    this.rightPanelStyle = {
      display: 'none',
    };
  };

  openEventDialog(): void {
    const evenDialog = document.getElementById('editEventModal');
    if (evenDialog) {
      evenDialog.style.display = 'block';
    }
  };

  onSubmit(form: NgForm): void {
    this.isDateValid = this.headerService.validateDate(form.value.date);
    this.isTitleValid = this.headerService.validateTitle(form.value.title);
    if (this.isDateValid && this.isTitleValid) {
      for (const [i, day] of this.daysObj.entries()) {
        let dateArr = this.event.date.split('/');
        let date = Number(dateArr[0]);
        let month = Number(dateArr[1]);
        let year = Number(dateArr[2]);
        if (day.day === date) {
          day.events.forEach((item) => {
            if (item.id === this.event.id) {
              item.title = form.value.title;
            }
          });
        }
      }
      this.calenderBodyService.editEvent(this.eventId, form.value.title);
      this.closeEventDialog();
    } else if (!this.isDateValid) {
      alert('Please enter date in dd/mm/yyyy format!');
    }
  };

  closeEventDialog(): void {
    const evenDialog = document.getElementById('editEventModal');
    if (evenDialog) {
      evenDialog.style.display = 'none';
    }
  };

  resetForm(): void {
    this.editEventForm.reset();
  };

  editEvent() {
    this.editEventForm.setValue({
      title: this.event.title,
      date: this.event.date,
    });
    this.openEventDialog();
    this.closeContextMenu();
  };

  deleteEvent() {
    for (const [i, day] of this.daysObj.entries()) {
      let dateArr = this.event.date.split('/');
      let date = Number(dateArr[0]);
      if (day.day === date) {
        day.events.splice(this.index, 1);
      }
    }
    this.calenderBodyService.deleteEvent(this.eventId);
    this.closeContextMenu();
  };

  drop(event: CdkDragDrop<{ id: string; title: string; date: string }[]>) {
    let draggedEvent = event.previousContainer.data[event.currentIndex];
    let element: any = event.container.element;
    let dropDate = Number(element.nativeElement.children[0].outerText);
    this.daysObj[dropDate - 1].events.push(draggedEvent);
    for (const [i, day] of this.daysObj.entries()) {
      let dateArr = draggedEvent.date.split('/');
      let date = Number(dateArr[0]);
      if (day.day === date) {
        day.events.splice(event.currentIndex, 1);
      }
    }
    this.calenderBodyService.changeEventDate(draggedEvent, dropDate);
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  };
  // let dateArr = [
  //   {dateId: '', date: new Date(), events: [{id: '', title: '', date: ''}]}
  // ]

  // {
  //   dateAsKey: {events: [{id: '', title: '', date: ''}]}
  // }
}
