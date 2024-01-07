import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalenderBodyComponent } from './calender-body/calender-body.component';
import { ChangeMonthComponent } from './calender-body/change-month/change-month.component';
import { MonthBodyComponent } from './calender-body/month-body/month-body.component';
import { EventContextMenuDirective } from './shared/event-context-menu.directive';
import { ApiEndPointService } from './shared/service/api-end-point.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EventsResolverService } from './shared/service/events-resolver.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'calender', component: CalenderBodyComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalenderBodyComponent,
    ChangeMonthComponent,
    MonthBodyComponent,
    EventContextMenuDirective,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiEndPointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
