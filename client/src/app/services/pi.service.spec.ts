import { TestBed, inject } from '@angular/core/testing';

import { PIService } from './pi.service';

describe('PIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PIService]
    });
  });

  it('should ...', inject([PIService], (service: PIService) => {
    expect(service).toBeTruthy();
  }));
});
