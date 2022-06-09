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
  email: string = '';
  usuarioConectado: Usuario = new Usuario();
  usuario: Observable<any> = this.loginservice.afAuth.user;

  constructor(public loginservice: FirebaseloginService,public serviceDatos: TraerDatosService) 
  {    
  }

  ngOnInit(): void {    
      this.usuario.subscribe(usuario => {
        this.estaLogeado = (usuario) ? true : false;
      })
  }

  Desloguear()
  {    
    const x = this.loginservice.singOut();
  }

  async traerUsuario()
  {
    return (await this.serviceDatos.getAll()).subscribe(users =>{
      let x = users.find(user => user.mail == this.email)
        if(x != null){
          this.usuarioConectado = x
          this.estaLogeado = true;
        }
      });
  }

}
