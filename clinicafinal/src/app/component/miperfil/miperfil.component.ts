import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  usuarioConectado!: Usuario;
  cargando: boolean = false;

  desde!: number;
  hasta!: number;

  seActualizo:boolean = false;

  constructor(public loginservice: FirebaseloginService, public serviceDatos: TraerDatosService) { }

  ngOnInit(): void {
    this.traerUsuario();
  }


  async traerUsuario() {
    this.cargando = true;
    this.loginservice.getCurrentUser().then(async user => {
      if (user?.email) {
        console.log(user?.email);
        (await this.serviceDatos.traertipo(user?.email)).subscribe(async (usuarios: Usuario[]) => {
          (await this.serviceDatos.traerUsuario(usuarios[0].mail, usuarios[0].tipo)).subscribe(async user => {
            this.usuarioConectado = user[0];
            if (this.usuarioConectado.tipo == 'especialista') {
              this.desde = this.usuarioConectado.franjaHoraria[0];
              this.hasta = this.usuarioConectado.franjaHoraria[1];
              console.log(this.usuarioConectado.id)
            }
            if (this.usuarioConectado.imagenes == undefined) {
              this.usuarioConectado.imagenes = [];
              await this.serviceDatos.traerImagenes(this.usuarioConectado.mail).then(url => {
                this.usuarioConectado.imagenes.push(url);
                this.cargando = false;
              })
            }
            else {
              this.cargando = false;
            }
          })
        })
      }
    })
  }

  async cambiarDisp() {
    this.usuarioConectado.franjaHoraria[0] = this.desde;
    this.usuarioConectado.franjaHoraria[1] = this.hasta;
    this.serviceDatos.actualizarEspecialista(this.usuarioConectado).then(x =>{
      this.seActualizo = true;
    });
  }

}
