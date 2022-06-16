import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { Usuario } from 'src/app/entidades/usuario/usuario';
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

  arrayUsuario: Usuario[] = [];
  arrayEspecialista: Usuario[] = [];
  arrayAdmin: Usuario[] = [];

  constructor(public fb: FormBuilder, public serviceLogin: FirebaseloginService, private route: Router, public serviceTraerDatos: TraerDatosService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      'password': []
    });

    this.traerPacientes();
    this.traerEspecialista();
  }


  async ingresar(){

    try {
      let estaHabilitado = true;
      this.muestroSpiner = true;

          await this.serviceLogin.login(this.form.value.email, this.form.value.password).then(async res => {
            if (false /*!res.user?.emailVerified*/) {
              this.mensajeError = "Verificar Email";
              this.serviceLogin.singOut();
            }
            else {
              await this.serviceTraerDatos.getAllEspecialista().subscribe(async(data) => {
                let aux = data.find(user => user.mail == this.form.value.email);
                if (aux != undefined) {
                  if (aux?.habilitado) {
                    this.route.navigate(['/home']);
                  }
                  else {
                    this.serviceLogin.singOut();
                    this.mensajeError = "Usuario no habilitado";
                  }
                }
                else{
                  this.route.navigate(['/home']);
                }
              });                       
            }
            this.muestroSpiner = false;  
          });
        }
      catch (ex) {
      if (ex instanceof Error) {
        this.mensajeError = ex.message;
      }
    }
  }

  async inicioRapido() {
    const x = await this.serviceLogin.login("thomasciarlo18@gmail.com", "123456").then(() =>{
      this.route.navigate(['/home']);
    });
  }

  traerPacientes()
  {
    this.arrayUsuario = [];
    this.serviceTraerDatos.getAllPacientes().subscribe(users =>{
       users.forEach(user =>{
          user.imagenes = [];
          this.serviceTraerDatos.traerImagenes(user.mail).then(url => {
          user.imagenes.push(url);
          this.arrayUsuario.push(user);
        })
       })
    })
  }
  traerEspecialista()
  {
    this.arrayEspecialista = [];
    this.serviceTraerDatos.getAllEspecialista().subscribe(users =>{
       users.forEach(user =>{
          user.imagenes = [];
          this.serviceTraerDatos.traerImagenes(user.mail).then(url => {
          user.imagenes.push(url);
          this.arrayEspecialista.push(user);
        })
       })
    })
  }

  async clickRapido(usuario: Usuario)
  {
    const x = await this.serviceLogin.login(usuario.mail, usuario.password).then(() =>{
      this.route.navigate(['/home']);
    })
  }

}
