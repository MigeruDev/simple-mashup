import { TestBed, inject } from '@angular/core/testing';

import { SOAPService } from './soap.service';

describe('RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SOAPService]
    });
  });

  it('should be created', inject([SOAPService], (service: SOAPService) => {
    expect(service).toBeTruthy();
  }));
});