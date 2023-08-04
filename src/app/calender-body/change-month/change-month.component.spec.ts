import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMonthComponent } from './change-month.component';

describe('ChangeMonthComponent', () => {
  let component: ChangeMonthComponent;
  let fixture: ComponentFixture<ChangeMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
