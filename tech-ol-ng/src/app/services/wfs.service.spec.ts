import { TestBed } from '@angular/core/testing';

import { WFSService } from './wfs.service';

describe('WFSService', () => {
  let service: WFSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WFSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
