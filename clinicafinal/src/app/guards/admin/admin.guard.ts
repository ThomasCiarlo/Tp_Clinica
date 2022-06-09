import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { FirebaseloginService } from 'src/app/service/firebaselogin/firebaselogin.service';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  retorno: boolean = false;

  constructor(public serviceTraerDatos: TraerDatosService, private route: Router,public loginservice: FirebaseloginService)
  {
    
  }

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

      return new Promise<boolean>((resolve, reject) => {
        this.loginservice.getCurrentUser().then(async data =>{
          (await this.serviceTraerDatos.getAll()).subscribe((users: Usuario[]) => {
               let x = users.find(user => user.mail == data?.email);
                if(x?.tipo == 'admin')
                {        
                  resolve(true);
                }
                else
                {
                  resolve(false);            
                }
            });
        });
      })


  }
  
  
}
