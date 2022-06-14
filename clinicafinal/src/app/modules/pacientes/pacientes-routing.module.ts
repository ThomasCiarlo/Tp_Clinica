import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisturnosComponent } from './misturnos/misturnos.component';
import { NuevoturnoComponent } from './nuevoturno/nuevoturno.component';
import { PacientesComponent } from './pacientes.component';

const routes: Routes = 
    [
      { path: '', component: PacientesComponent },
      { path: 'pacientes/nuevoTurno', component: NuevoturnoComponent },
      { path: 'pacientes/misturnos', component: MisturnosComponent }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
