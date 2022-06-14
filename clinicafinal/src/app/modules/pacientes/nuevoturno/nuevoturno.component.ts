import { Component, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/entidades/disponibilidad/disponibilidad';
import { Turno } from 'src/app/entidades/turno/turno';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';
import { FormturnoComponent } from './formturno/formturno.component';
import { FirebaseregisterService } from 'src/app/service/firebaseregister/firebaseregister.service';

@Component({
  selector: 'app-nuevoturno',
  templateUrl: './nuevoturno.component.html',
  styleUrls: ['./nuevoturno.component.css']
})
export class NuevoturnoComponent implements OnInit {

  constructor(public traerDatos: TraerDatosService,public serviceLogin: FirebaseloginService, public serviceSubida: FirebaseregisterService) { }
  listaEspecialistas: Usuario[] = [];
  especialistaSeleccionado!: Usuario;
  turnoNuevo! :Turno;

  arrayTurnos: Disponibilidad[] = [];
  //arrayDisponibilidad: any[] = [];
  arrayDisponibilidad: Disponibilidad[] = [];

  ngOnInit(): void {
    
  }

  tomarLista(listaEspecialistaFiltrada: Usuario[])
  {
    this.listaEspecialistas = listaEspecialistaFiltrada;
  }

  tomarEspecialista(especialista: Usuario)
  {
    this.especialistaSeleccionado = especialista;
    this.traerTurnosDelEspecialista();
  }

  async traerTurnosDelEspecialista()
  {
    let diaActual = new Date();
    
    console.log(this.especialistaSeleccionado);
    const x = (await this.traerDatos.traerTurnosDoc(this.especialistaSeleccionado?.id,diaActual.getDate())).subscribe(
      (turnos: Turno[]) => {
        console.log(turnos);
        let dispTurno = new Disponibilidad();;
        turnos.forEach((turno:Turno) => { 

            dispTurno = new Disponibilidad();  
            dispTurno.dia = turno.dia;
            dispTurno.horarios.push(turno.horario);
            

            this.arrayTurnos.push(dispTurno);

        })
        this.disponibilidad();
        this.sacarDisponibilidad();
      });

      
  }

  async disponibilidad()
  {
    let disponibilidad = new Disponibilidad();
    this.arrayDisponibilidad = [];
    let x = new Date();   
    for (let dia = x.getDate() + 1; dia <= x.getDate() + 15; dia++) {
        disponibilidad = new Disponibilidad();
        disponibilidad.dia = dia;
        for (let hora = this.especialistaSeleccionado.franjaHoraria[0]; hora <= this.especialistaSeleccionado.franjaHoraria[1]; hora++) {
            disponibilidad.horarios.push(hora);
        }

        this.arrayDisponibilidad.push(disponibilidad);
    }
    
  }

  sacarDisponibilidad()
  {
    this.arrayTurnos.forEach(turno =>{
      this.arrayDisponibilidad.forEach(disponible => {
        if(turno.dia == disponible.dia){
          console.log(turno.horarios);
          console.log(disponible.dia);
          disponible.horarios = disponible.horarios.filter(hora => hora != turno.horarios[0])
        }
      })
    })
  }

  tomarTurno(turno: Turno)
  {
    this.turnoNuevo = turno;
    this.turnoNuevo.especialidad = this.especialistaSeleccionado.especialidad;
    this.turnoNuevo.idEspecialista = this.especialistaSeleccionado.id;
    this.turnoNuevo.nombreApellidoEspecialista = this.especialistaSeleccionado.nombre + " " + this.especialistaSeleccionado.apellido
    this.serviceLogin.getCurrentUser().then(user =>{
      if(user?.uid != undefined)
        this.turnoNuevo.idPaciente = user?.uid;

        this.serviceSubida.createTurno(turno);
    })

    
     
  }

}
