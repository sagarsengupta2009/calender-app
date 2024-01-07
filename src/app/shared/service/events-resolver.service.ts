import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEndPointService } from './api-end-point.service';

@Injectable({
  providedIn: 'root'
})

// interface Event { 
//   id: string; 
//   title: string; 
//   date: string 
// }[];
// interface Events {
//   [index: number]: { id: string; labtitleel: string; date: string };
// }

export class EventsResolverService implements Resolve<Event> {
  constructor(
    private apiEndPoint: ApiEndPointService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.apiEndPoint.getEvents();
  }
}
