import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';
import { LoadingComponent } from 'src/app/component/loading/loading.component';

@Component({
  selector: 'app-lista-especialista',
  templateUrl: './lista-especialista.component.html',
  styleUrls: ['./lista-especialista.component.css']
})
export class ListaEspecialistaComponent implements OnInit {

  ListaUsuarios: Usuario[] = [];
  cargando = false;
  constructor(public serviceTraerDatos: TraerDatosService) 
  {
  }

  ngOnInit(): void {
    this.cargando = true;
    this.serviceTraerDatos.getAllEspecialista().subscribe( user =>{ 
      this.ListaUsuarios = [];    
      user.forEach(usuarios => {
        this.ListaUsuarios.push(usuarios);
      })
      this.cargando = false;
    })
  }

  cambiarEstado(usuario: Usuario)
  {
      usuario.habilitado = !usuario.habilitado;
      this.serviceTraerDatos.actualizarEspecialista(usuario).then(values =>{
        console.log(values);
      })
  }

}
