import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  mensajeError!: string;
  muestroSpiner: boolean = false;
  constructor(public fb: FormBuilder, public serviceLogin: FirebaseloginService, private route: Router, public serviceTraerDatos: TraerDatosService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      'password': []
    });
  }


  async ingresar() {
    try {

      let estaHabilitado = true;
      await this.serviceTraerDatos.filtrarPorMailEspecialista(this.form.value.email);

      if (this.serviceTraerDatos.datosEspecialistaConectado != undefined) {
        if (this.serviceTraerDatos.datosEspecialistaConectado.habilitado) {
          estaHabilitado = true;
        }
        else {
          estaHabilitado = false;
        }
      }

      if (estaHabilitado) {

        const x = await this.serviceLogin.login(this.form.value.email, this.form.value.password);

        if (!x.user?.emailVerified) {
          this.mensajeError = "Verificar Email";
          await this.serviceLogin.singOut();
        }
        else {
          this.route.navigate(['/home']);
        }
      }
      else
      {
        this.mensajeError = "Usuario no habilitado";
      }
    }
    catch (ex) {
      if (ex instanceof Error) {
        this.mensajeError = ex.message;
      }
    }
  }

  async inicioRapido() {
    const x = await this.serviceLogin.login("thomasciarlo18@gmail.com", "123456");
    if (x.user?.emailVerified)
      this.route.navigate(['/home']);
  }

}
