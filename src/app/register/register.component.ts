import { Component, OnInit } from '@angular/core';
import { ApiEndPointService } from '../shared/service/api-end-point.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userResponse: any;
  constructor(
    private apiEndPoint: ApiEndPointService
  ) { } 

  ngOnInit(): void {
  }

  onSubmit(name: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement) {
    console.log(name.value, email.value, password.value);
    this.apiEndPoint.registerUser({name: name.value, email: email.value, password: password.value}).subscribe(
      (res: any) => {
        this.userResponse = res;
      }
    )
  }
}
