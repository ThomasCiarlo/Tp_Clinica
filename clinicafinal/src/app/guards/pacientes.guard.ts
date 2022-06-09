import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario/usuario';
import { FirebaseloginService } from '../service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from '../service/traerDatosFirebase/traer-datos.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesGuard implements CanActivate {

  constructor(public serviceTraerDatos: TraerDatosService, private route: Router,public loginservice: FirebaseloginService)
  {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return new Promise<boolean>((resolve, reject) => {
        this.loginservice.getCurrentUser().then(async data =>{
          (await this.serviceTraerDatos.getAll()).subscribe((users: Usuario[]) => {
               let x = users.find(user => user.mail == data?.email);
                if(x?.tipo == 'paciente')
                {    
                  console.log("entro");      
                  resolve(true);
                }
                else
                {
                  console.log("aca tambien entro");
                  resolve(false);            
                }
            });
        });
      })

  }
  
}
