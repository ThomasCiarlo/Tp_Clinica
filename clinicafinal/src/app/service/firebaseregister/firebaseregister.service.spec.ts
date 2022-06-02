import { TestBed } from '@angular/core/testing';

import { FirebaseregisterService } from './firebaseregister.service';

describe('FirebaseregisterService', () => {
  let service: FirebaseregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
