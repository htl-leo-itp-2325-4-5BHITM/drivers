import { TestBed } from '@angular/core/testing';

import { HardcodeService } from './hardcode.service';

describe('HardcodeService', () => {
  let service: HardcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
