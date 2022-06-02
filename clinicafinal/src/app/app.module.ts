import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './component/bienvenida/bienvenida.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormRegisterComponent } from './component/form-register/form-register.component';

import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { HomeComponent } from './component/home/home.component';
import { FormRegisterAdminComponent } from './component/form-register-admin/form-register-admin.component';
import { FormRegisterEspecialistaComponent } from './component/form-register-especialista/form-register-especialista.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    FormRegisterComponent,
    UsuariosComponent,
    HomeComponent,
    FormRegisterAdminComponent,
    FormRegisterEspecialistaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
