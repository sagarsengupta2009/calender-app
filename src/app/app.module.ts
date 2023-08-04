import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalenderBodyComponent } from './calender-body/calender-body.component';
import { ChangeMonthComponent } from './calender-body/change-month/change-month.component';
import { MonthBodyComponent } from './calender-body/month-body/month-body.component';
import { FormsModule } from '@angular/forms';
import { EventContextMenuDirective } from './shared/event-context-menu.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalenderBodyComponent,
    ChangeMonthComponent,
    MonthBodyComponent,
    EventContextMenuDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
