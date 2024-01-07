import { Component, OnInit } from '@angular/core';
import { ApiEndPointService } from '../shared/service/api-end-point.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiEndPoint: ApiEndPointService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(username: HTMLInputElement, password: HTMLInputElement) {
    console.log(username.value, password.value);
    this.apiEndPoint.loginUser({email: username.value, password: password.value})
  }
}
