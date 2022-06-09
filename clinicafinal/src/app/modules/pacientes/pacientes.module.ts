import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { ListEspecialistaComponent } from './nuevoturno/list-especialista/list-especialista.component';
import { FormturnoComponent } from './nuevoturno/formturno/formturno.component';
import { NuevoturnoComponent } from './nuevoturno/nuevoturno.component';

import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CalendarioturnosComponent } from './nuevoturno/calendarioturnos/calendarioturnos.component';
import { FirebaseregisterService } from 'src/app/service/firebaseregister/firebaseregister.service';



@NgModule({
  declarations: [
    PacientesComponent,
    NuevoturnoComponent,
    ListEspecialistaComponent,
    FormturnoComponent,
    CalendarioturnosComponent,
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PacientesModule { }
