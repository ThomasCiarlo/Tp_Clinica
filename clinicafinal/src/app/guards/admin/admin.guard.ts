import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { TraerDatosService } from 'src/app/service/traerDatosFirebase/traer-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public serviceTraerDatos: TraerDatosService, private route: Router)
  {
    this.serviceTraerDatos.traeDatosAdministradores();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    

      if(this.serviceTraerDatos.datosAdminConectado?.tipo == 'admin')
      {
        return true;
      }
      else
      {
          return false;
      }

  }
  
}
