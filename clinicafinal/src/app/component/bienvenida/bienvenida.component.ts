import { Component, OnInit } from '@angular/core';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  login = false;
  register = false;
  estaLogeado: boolean = false;
  usuarioConectado: Usuario = new Usuario();
  usuario: Observable<any> = this.loginservice.afAuth.user;

  constructor(public loginservice: FirebaseloginService, public serviceDatos: TraerDatosService) {
  }

  ngOnInit(): void {
    this.usuario.subscribe(usuario => {
      this.estaLogeado = (usuario) ? true : false;
      if (this.estaLogeado) {
        this.traerUsuario();
        console.log(this.usuarioConectado.mail);
      }
    })
  }

  Desloguear() {
    const x = this.loginservice.singOut();
  }

  async traerUsuario() {
    let mail
    await this.loginservice.getCurrentUser().then(async user => {
      mail = user?.email;
      if (user?.email) {
       (await this.serviceDatos.traertipo(mail!)).subscribe(async (usuarios:Usuario[]) => {
          console.log(usuarios);
            (await this.serviceDatos.traerUsuario(usuarios[0].mail,usuarios[0].tipo)).subscribe(user => {
              this.usuarioConectado = user[0];
            })
        })
      }
    })
  }
}
