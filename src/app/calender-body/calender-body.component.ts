import { Component, OnInit } from '@angular/core';
import { AppInitializerService } from '../app-initializer.service';
import { CalenderBodyService } from './calender-body.service';
import { ApiEndPointService } from '../shared/service/api-end-point.service';
import { SpinnerService } from '../shared/service/spinner.service';
interface EventsResponse {
  id: string,
  title: string,
  date: string,
  __v: number,
  _id: string
}
@Component({
  selector: 'app-calender-body',
  templateUrl: './calender-body.component.html',
  styleUrls: ['./calender-body.component.css']
})

export class CalenderBodyComponent implements OnInit {
  storeObjKey = 'allEvents';
  events: {id: string, title: string, date: string}[] | null = [];
  isDataThere: boolean = false;
  constructor(
    private readonly calenderBodyService: CalenderBodyService,
    private apiEndPoint: ApiEndPointService,
    private readonly spinner: SpinnerService,
  ) { }

  ngOnInit(): void {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     let events = data;
    //     console.log(events);
    //   }
    // )
    
    // this.events = this.appInitializer.getDataFromStorage(this.storeObjKey);
    this.spinner.show();
    this.apiEndPoint.getEvents().subscribe(
      (response: any) => {
        this.events = response;
        this.isDataThere = true;
        this.spinner.hide()
      }
    );
    if(this.events) {
      this.calenderBodyService.includeStorageEvents(this.events);
    }
  }
}
