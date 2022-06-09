import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEspecialistaComponent } from './lista-especialista/lista-especialista.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = 
      [
        { path: '', component: UsuariosComponent },
        { path: 'usuarios/listaEspecialistas', component: ListaEspecialistaComponent }
      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
