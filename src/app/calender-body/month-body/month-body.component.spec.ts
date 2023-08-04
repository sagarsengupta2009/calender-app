import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthBodyComponent } from './month-body.component';

describe('MonthBodyComponent', () => {
  let component: MonthBodyComponent;
  let fixture: ComponentFixture<MonthBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
