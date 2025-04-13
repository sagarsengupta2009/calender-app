import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiEndPointService {
  constructor(private readonly http: HttpClient) {}

  loginUser(userData: any) {
    return this.http.post<any>('http://localhost:3000/login', userData);
  }

  registerUser(userData: any) {
    return this.http.post<any>('http://localhost:3000/register', userData);
  }

  saveNewEvent(data: any) {
    return this.http.post<{ id: string; title: string; date: string }>(
      'http://localhost:3000/calenderdates',
      data
    );
  }

  getEvents() {
    return this.http.get('http://localhost:3000/getEvents');
  }

  updateEvent(event: any) {
    return this.http.put(`http://localhost:3000/editEvent`, event);
  }

  deleteEvent(id: string) {
    return this.http.delete(`http://localhost:3000/deleteEvent/${id}`);
  }
}
