import { Component, OnInit } from '@angular/core';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  login = false;
  register = false;
  estaLogeado: boolean = false;
  usuarioConectado$: Observable<any> = this.loginservice.afAuth.user;

  constructor(public loginservice: FirebaseloginService,public guardAdmin: AdminGuard) { }



  ngOnInit(): void {
    this.usuarioConectado$.subscribe(usuario => {
      this.estaLogeado = (usuario) ? true : false;
      console.log(this.estaLogeado);
    });
  }

  Desloguear()
  {    
    const user = this.loginservice.singOut();
  }

}
