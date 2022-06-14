import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/entidades/turno/turno';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Component({
  selector: 'app-misturnos',
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css']
})
export class MisturnosComponent implements OnInit {

  listaturnos: Turno[] = [];
  listaturnosFiltrada: Turno[] = [];
  filtro: string = "";
  filtropor: string = "";

  modalsCancelar = false;

  constructor(public traerDatos: TraerDatosService,public serviceLogin: FirebaseloginService) { }

  ngOnInit(): void {
    this.serviceLogin.getCurrentUser().then(async user => {
      if(user?.uid != null){
        (await this.traerDatos.traerTurnosPaciente(user?.uid)).subscribe((turnos:Turno[]) => {
          turnos.forEach((turno: Turno) => {
            this.listaturnos.push(turno);
          })
        })
      }          
    })   
  }


  cancelar()
  {
      this.modalsCancelar = true;
  }

}
