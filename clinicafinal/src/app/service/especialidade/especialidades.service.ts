import { Injectable } from '@angular/core';
import { Especialidad } from 'src/app/entidades/especialidad/especialidad';
import { TraerDatosService } from '../traerDatosFirebase/traer-datos.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  especialidades!: Especialidad[];

  constructor(public serviceDatos: TraerDatosService) 
  {
    this.especialidades = [];
    this.serviceDatos.traerEspecialidades().then(esp => {
      esp.subscribe((especialdiades: Especialidad[])=>{
          this.especialidades = especialdiades;
          console.log(this.especialidades);
      })
    })
  }
}
