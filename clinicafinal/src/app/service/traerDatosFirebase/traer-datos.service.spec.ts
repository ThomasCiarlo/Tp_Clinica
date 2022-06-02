import { TestBed } from '@angular/core/testing';

import { TraerDatosService } from './traer-datos.service';

describe('TraerDatosService', () => {
  let service: TraerDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraerDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
