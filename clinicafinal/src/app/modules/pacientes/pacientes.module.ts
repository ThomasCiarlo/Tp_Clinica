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
import { MisturnosComponent } from './misturnos/misturnos.component';
import { FiltradoPipe } from 'src/app/pipe/filtrado.pipe';
import { FormsModule } from '@angular/forms';
import { CancelarturnoComponent } from './modals/cancelarturno/cancelarturno.component';

import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    PacientesComponent,
    NuevoturnoComponent,
    ListEspecialistaComponent,
    FormturnoComponent,
    CalendarioturnosComponent,
    MisturnosComponent,
    FiltradoPipe,
    CancelarturnoComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ModalModule
  ],
  providers: [BsModalService],
})
export class PacientesModule { }
