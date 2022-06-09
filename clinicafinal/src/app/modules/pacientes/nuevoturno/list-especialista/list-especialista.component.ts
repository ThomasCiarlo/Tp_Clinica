import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario/usuario';

@Component({
  selector: 'app-list-especialista',
  templateUrl: './list-especialista.component.html',
  styleUrls: ['./list-especialista.component.css']
})
export class ListEspecialistaComponent implements OnInit {

  @Input() ListaUsuarios: Usuario[] | undefined;
  @Output() especialistaSeleccionado: EventEmitter<any>= new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionoEspecialista(especialista: Usuario)
  {
      this.especialistaSeleccionado.emit(especialista);
  }

}
