import { Injectable } from '@angular/core';
import { ApiEndPointService } from './shared/service/api-end-point.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from './shared/service/spinner.service';
@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(
    private readonly apiEndPoint: ApiEndPointService,
    private readonly spinner: SpinnerService,
  ) { }

  public getDataFromStorage<T>(key: string): T | null {
    this.spinner.show();
    this.apiEndPoint.getEvents().subscribe(response => {
      console.log(response);
      let allEvents = response;
      localStorage.setItem('allEvents', JSON.stringify(allEvents));
      localStorage.getItem(key);
      // if(events) {
      //   return JSON.parse(events);
      // }
      this.spinner.hide()
    });
    // let events = localStorage.getItem(key);
    // if(events) {
    //   return JSON.parse(events);
    // }
    // alert(`${key} missing in localStorage.`);
    return null;
  }
}
