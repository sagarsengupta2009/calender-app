import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor() { }

  public getDataFromStorage<T>(key: string): T | null {
    let events = localStorage.getItem(key);
    if(events) {
      return JSON.parse(events);
    }
    alert(`${key} missing in localStorage.`);
    return null;
  }
}
