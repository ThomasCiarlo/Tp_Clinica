import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoturnoComponent } from './nuevoturno/nuevoturno.component';
import { PacientesComponent } from './pacientes.component';

const routes: Routes = 
    [
      { path: '', component: PacientesComponent },
      { path: 'pacientes/nuevoTurno', component: NuevoturnoComponent },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
