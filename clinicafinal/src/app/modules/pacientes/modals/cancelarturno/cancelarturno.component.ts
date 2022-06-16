import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/entidades/turno/turno';

@Component({
  selector: 'app-cancelarturno',
  templateUrl: './cancelarturno.component.html',
  styleUrls: ['./cancelarturno.component.css']
})
export class CancelarturnoComponent implements OnInit {

  comentario: string = "";
  turno!: Turno;
  constructor() 
  {
   
  }

  ngOnInit(): void {
    console.log(this.turno);
  }

  
  cancelarTurno()
  {
  }

}
