import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calender-app';

  constructor(
  ) {}

  ngOnInit(): void {
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     let events = data;
    //     console.log(events);
    //   }
    // )
  }
  
}
