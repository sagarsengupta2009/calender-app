import { Component, OnInit } from '@angular/core';
import { ApiEndPointService } from '../shared/service/api-end-point.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private apiEndPoint: ApiEndPointService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(username: HTMLInputElement, password: HTMLInputElement) {
    console.log(username.value, password.value);
    this.apiEndPoint
      .loginUser({ email: username.value, password: password.value })
      .subscribe((res: any) => {
        if (res.email && res.password) {
          this.router.navigate(['/calender']);
        }
      });
  }
}
