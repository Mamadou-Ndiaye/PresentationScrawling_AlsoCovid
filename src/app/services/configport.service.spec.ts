import { TestBed } from '@angular/core/testing';

import { ConfigportService } from './configport.service';

describe('ConfigportService', () => {
  let service: ConfigportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//
