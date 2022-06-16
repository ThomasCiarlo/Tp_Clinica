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
import { HomeComponent } from './component/home/home.component';
import { FormRegisterAdminComponent } from './component/form-register-admin/form-register-admin.component';
import { FormRegisterEspecialistaComponent } from './component/form-register-especialista/form-register-especialista.component';
import { LoadingComponent } from './component/loading/loading.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CaptchatComponent } from './component/captchat/captchat.component';

import { FormsModule } from '@angular/forms';
import { MiperfilComponent } from './component/miperfil/miperfil.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    FormRegisterComponent,
    HomeComponent,
    FormRegisterAdminComponent,
    FormRegisterEspecialistaComponent,
    LoadingComponent,
    CaptchatComponent,
    MiperfilComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
