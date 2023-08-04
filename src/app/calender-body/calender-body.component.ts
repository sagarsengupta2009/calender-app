import { Component, OnInit } from '@angular/core';
import { AppInitializerService } from '../app-initializer.service';
import { CalenderBodyService } from './calender-body.service';

@Component({
  selector: 'app-calender-body',
  templateUrl: './calender-body.component.html',
  styleUrls: ['./calender-body.component.css']
})
export class CalenderBodyComponent implements OnInit {
  storeObjKey = 'allEvents';
  events: {id: string, title: string, date: string}[] | null = [];
  constructor(
    private readonly appInitializer: AppInitializerService,
    private readonly calenderBodyService: CalenderBodyService
  ) { }

  ngOnInit(): void {
    this.events = this.appInitializer.getDataFromStorage(this.storeObjKey);
    if(this.events) {
      this.calenderBodyService.includeStorageEvents(this.events);
    }
  }
}
