import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/entidades/turno/turno';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';
import { FirebaseregisterService } from 'src/app/service/firebaseregister/firebaseregister.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CancelarturnoComponent } from '../modals/cancelarturno/cancelarturno.component';

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
  closeResult = '';
  muestroCancelar: boolean = false;

  turnoSeleccionado!: Turno

  bsModalRef!: BsModalRef;
  comentario: string = "";

  constructor(public actualizarDatos: FirebaseregisterService,public traerDatos: TraerDatosService,public serviceLogin: FirebaseloginService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listaturnos = [];
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


  openCancelar(template: any,turno: Turno) {
    this.turnoSeleccionado = turno;
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  openComentario(template: any,turno: Turno) {
    this.comentario =  turno.comentario;
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.turnoSeleccionado.estado = "CANCELADO";
    this.turnoSeleccionado.comentario = this.comentario;
    this.actualizarDatos.cancelarTurno(this.turnoSeleccionado).then(resp => {
      this.bsModalRef?.hide();
    })
  }

}
