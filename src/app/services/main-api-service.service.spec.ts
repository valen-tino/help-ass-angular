import { TestBed } from '@angular/core/testing';

import { MainApiServiceService } from './main-api-service.service';

describe('MainApiServiceService', () => {
  let service: MainApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
