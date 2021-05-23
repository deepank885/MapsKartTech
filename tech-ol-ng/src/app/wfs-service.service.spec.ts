import { TestBed } from '@angular/core/testing';

import { WfsServiceService } from './wfs-service.service';

describe('WfsServiceService', () => {
  let service: WfsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
