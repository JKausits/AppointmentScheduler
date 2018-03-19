import { TestBed, inject } from '@angular/core/testing';

import { ScheduledHourService } from './scheduled-hour.service';

describe('ScheduledHourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduledHourService]
    });
  });

  it('should be created', inject([ScheduledHourService], (service: ScheduledHourService) => {
    expect(service).toBeTruthy();
  }));
});
