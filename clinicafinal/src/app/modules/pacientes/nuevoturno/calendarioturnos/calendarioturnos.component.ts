import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Disponibilidad } from 'src/app/entidades/disponibilidad/disponibilidad';
import { Turno } from 'src/app/entidades/turno/turno';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Component({
  selector: 'app-calendarioturnos',
  templateUrl: './calendarioturnos.component.html',
  styleUrls: ['./calendarioturnos.component.css']
})
export class CalendarioturnosComponent implements OnInit {

  dias: number[] = [];
  horas: number[] = [11,12,13,14,15,16];
  turnosEspecialista!: Turno;

  @Input() disponibilidad!: Disponibilidad[];

  @Output() nuevoTurno: EventEmitter<any>= new EventEmitter<any>();

  constructor(public traeDatos: TraerDatosService) { }

  ngOnInit(): void {
    
  }

  async TomarHorarioYDia(dia: number,hora: number)
  {
    const turno = new Turno();
    turno.dia = dia;
    turno.horario = hora;

    this.nuevoTurno.emit(turno);
  }

  


}
