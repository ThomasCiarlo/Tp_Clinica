import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ListaEspecialistaComponent } from './lista-especialista/lista-especialista.component';
import { LoadingComponent } from 'src/app/component/loading/loading.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    ListaEspecialistaComponent,
    
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
