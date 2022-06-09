import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { EspecialidadesService } from 'src/app/service/especialidade/especialidades.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Component({
  selector: 'app-formturno',
  templateUrl: './formturno.component.html',
  styleUrls: ['./formturno.component.css']
})
export class FormturnoComponent implements OnInit {


  public form!: FormGroup;
  listaEspecialistas: Usuario[] = [];
  @Output() listaDeEspecialistaFiltrada: EventEmitter<any>= new EventEmitter<any>();

  constructor(public serviceEspecialidad: EspecialidadesService,public fb: FormBuilder, public traerDatos: TraerDatosService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'especialidad': ['', Validators.nullValidator],
    });
  }

 async enviar(especialidad: string)
  {
    console.log(especialidad);
    this.listaEspecialistas = [];
    await this.traerDatos.getAllEspecialista().subscribe(datos =>{
       let x = (datos.find(esp => esp.especialidad == especialidad))
       if(x != undefined)
        this.listaEspecialistas.push(x);
     });
    
     this.listaDeEspecialistaFiltrada.emit(this.listaEspecialistas);
  }

}
