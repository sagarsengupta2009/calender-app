import { TestBed } from '@angular/core/testing';

import { EventsResolverService } from './events-resolver.service';

describe('EventsResolverService', () => {
  let service: EventsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
