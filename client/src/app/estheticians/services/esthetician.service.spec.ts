import { TestBed } from '@angular/core/testing';

import { EstheticianService } from './esthetician.service';

describe('EstheticianService', () => {
  let service: EstheticianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstheticianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
