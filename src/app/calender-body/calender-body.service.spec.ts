import { TestBed } from '@angular/core/testing';

import { CalenderBodyService } from './calender-body.service';

describe('CalenderBodyService', () => {
  let service: CalenderBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalenderBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
