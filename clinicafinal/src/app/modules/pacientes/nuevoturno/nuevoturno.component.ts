import { Component, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/entidades/disponibilidad/disponibilidad';
import { Turno } from 'src/app/entidades/turno/turno';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';
import { FormturnoComponent } from './formturno/formturno.component';
import { FirebaseregisterService } from 'src/app/service/firebaseregister/firebaseregister.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nuevoturno',
  templateUrl: './nuevoturno.component.html',
  styleUrls: ['./nuevoturno.component.css']
})
export class NuevoturnoComponent implements OnInit {

  constructor(public traerDatos: TraerDatosService, public serviceLogin: FirebaseloginService, public serviceSubida: FirebaseregisterService) { }
  listaEspecialistas: Usuario[] = [];
  especialistaSeleccionado!: Usuario;
  turnoNuevo!: Turno;

  arrayTurnos: Disponibilidad[] = [];
  //arrayDisponibilidad: any[] = [];
  arrayDisponibilidad: Disponibilidad[] = [];

  ngOnInit(): void {

  }

  tomarLista(listaEspecialistaFiltrada: Usuario[]) {
    this.listaEspecialistas = listaEspecialistaFiltrada;
  }

  tomarEspecialista(especialista: Usuario) {
    this.especialistaSeleccionado = especialista;
    this.traerTurnosDelEspecialista();
  }

  async traerTurnosDelEspecialista() {
    let diaActual = new Date();

    console.log(this.especialistaSeleccionado);
    const x = (await this.traerDatos.traerTurnosDoc(this.especialistaSeleccionado?.id, diaActual.getDate())).subscribe(
      (turnos: Turno[]) => {
        console.log(turnos);
        let dispTurno = new Disponibilidad();;
        turnos.forEach((turno: Turno) => {

          dispTurno = new Disponibilidad();
          dispTurno.dia = turno.dia;
          dispTurno.horarios.push(turno.horario);


          this.arrayTurnos.push(dispTurno);

        })
        this.disponibilidad();
        this.sacarDisponibilidad();
      });


  }

  sumarDias(fecha: Date, dias: number) {
    let x = new Date();
    return x.setDate(fecha.getDate() + dias);
  }

  async disponibilidad() {
    let disponibilidad = new Disponibilidad();
    this.arrayDisponibilidad = [];

    let x = new Date();
    let pipe = new DatePipe('en-US');

    for (let dia = 1; dia <= 15; dia++) {

      disponibilidad = new Disponibilidad();
      let diasumados = this.sumarDias(x, dia);
      let todayWithPipe = pipe.transform(diasumados, 'dd');

      if (todayWithPipe != null) {
        disponibilidad.dia = parseInt(todayWithPipe);
      }

      let numeroDia = new Date(diasumados).getDay();
      if (numeroDia != 0) {
        if (numeroDia != 6) {
          for (let hora = this.especialistaSeleccionado.franjaHoraria[0]; hora <= this.especialistaSeleccionado.franjaHoraria[1]; hora++) {
            disponibilidad.horarios.push(hora.toString()+ ':00');
            disponibilidad.horarios.push(hora.toString() + ':30');
          }
        }
      }
      this.arrayDisponibilidad.push(disponibilidad);
    }

  }

  sacarDisponibilidad() {
    console.log(this.arrayTurnos);
    this.arrayTurnos.forEach(turno => {
      this.arrayDisponibilidad.forEach(disponible => {
        if (turno.dia == disponible.dia) {
          disponible.horarios = disponible.horarios.filter(hora => hora != turno.horarios[0])
        }
      })
    })
  }

  tomarTurno(turno: Turno) {
    this.turnoNuevo = turno;
    this.turnoNuevo.especialidad = this.especialistaSeleccionado.especialidad;
    this.turnoNuevo.idEspecialista = this.especialistaSeleccionado.id;
    this.turnoNuevo.nombreApellidoEspecialista = this.especialistaSeleccionado.nombre + " " + this.especialistaSeleccionado.apellido
    this.serviceLogin.getCurrentUser().then(user => {
      if (user?.uid != undefined)
        this.turnoNuevo.idPaciente = user?.uid;

      this.serviceSubida.createTurno(turno);
    })



  }

}
