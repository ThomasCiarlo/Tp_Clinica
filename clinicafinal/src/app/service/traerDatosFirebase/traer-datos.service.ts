import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { Observable } from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import { FirebaseloginService } from '../firebaselogin/firebaselogin.service';

@Injectable({
  providedIn: 'root'
})
export class TraerDatosService {

  datosAdminConectado!: Usuario;
  datosEspecialistaConectado!: Usuario;
  emailUsuario?: any;

  constructor(public db: AngularFirestore, private serciceLogin: FirebaseloginService) {

  }

  async traeDatosEspecialista() {
    await this.serciceLogin.getCurrentUser()
    .then(data => { return data?.email })
    .then((email) => {
      if(email != null){
        console.log(email);
        return this.filtrarPorMailEspecialista(email);
      }
      else
      {
        return;
      }
    });
  }

 async filtrarPorMailEspecialista(mail: string)
  {
    (await this.getAllEspecialista()).subscribe((data: Usuario[]) => {
      let aux = data.find(user => user.mail === mail);
      console.log(aux);
      if (aux) {
        // console.log('jugador existente');
       this.datosEspecialistaConectado = aux;
      }
    });
  }

  async getAllEspecialista(){
    return this.db.collection('especialista')
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <Usuario>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as any
          }
        })
      }));

  }


  async traeDatosAdministradores() {
    await this.serciceLogin.getCurrentUser()
    .then(data => { return data?.email })
    .then((email) => {
      if(email != null){
        console.log(email);
        return this.filtrarPorMailAdministradores(email);
      }
      else
      {
        return;
      }
    });
  }

 async filtrarPorMailAdministradores(mail: string)
  {
    (await this.getAllAdministradores()).subscribe((data: Usuario[]) => {
      let aux = data.find(user => user.mail === mail);
      console.log(aux);
      if (aux) {
        this.datosAdminConectado = aux;
      }
    });
  }

  async getAllAdministradores(){
    return this.db.collection('administradores')
      .snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return <Usuario>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as any
          }
        })
      }));

  }

}
