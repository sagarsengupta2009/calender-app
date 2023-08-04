import { TestBed } from '@angular/core/testing';

import { MonthBodyService } from './month-body.service';

describe('MonthBodyService', () => {
  let service: MonthBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
