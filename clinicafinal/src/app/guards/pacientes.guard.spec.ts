import { TestBed } from '@angular/core/testing';

import { PacientesGuard } from './pacientes.guard';

describe('PacientesGuard', () => {
  let guard: PacientesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacientesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
