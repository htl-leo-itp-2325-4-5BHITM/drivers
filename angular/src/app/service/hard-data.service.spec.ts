import { TestBed } from '@angular/core/testing';

import { HardDataService } from './hard-data.service';

describe('HardDataService', () => {
  let service: HardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
