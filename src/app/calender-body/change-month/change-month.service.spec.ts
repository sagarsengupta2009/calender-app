import { TestBed } from '@angular/core/testing';

import { ChangeMonthService } from './change-month.service';

describe('ChangeMonthService', () => {
  let service: ChangeMonthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeMonthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
