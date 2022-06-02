import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  especialidades = ['PEDIATRA','ODONTOLOGO','PSICOLOGO'];

  constructor() { }
}
