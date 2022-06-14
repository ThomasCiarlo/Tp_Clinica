import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { Observable } from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import { FirebaseloginService } from '../firebaselogin/firebaselogin.service';
import { Turno } from 'src/app/entidades/turno/turno';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, getStorage, ref } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class TraerDatosService {

  datosAdminConectado!: Usuario;
  datosEspecialistaConectado!: Usuario;
  emailUsuario?: any;

  constructor(public db: AngularFirestore, private serciceLogin: FirebaseloginService,public storage: AngularFireStorage) {

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

 filtrarPorMailEspecialista(mail: string)
  {
    return this.getAllEspecialista();
  }

  getAllPacientes(){
    return this.db.collection('paciente')
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

  getAllEspecialista(){
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

  actualizarEspecialista(usuario :Usuario) {
    return this.db.collection('especialista').doc( usuario.id ).set( usuario ); 
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

  getAllAdministradores(){
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

  async getAll()
  {
  
     return this.db.collection('usuarios')
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

  async traerTurnosDoc(idEspecialista: string,dia:number) : Promise<Observable<Turno[]>>
  {
     return this.db.collection<Turno>('turnos', ref => ref.where('idEspecialista', '==' ,idEspecialista).where('dia','>=',dia)).valueChanges();
  }

  async traerTurnosPaciente(idpaciente: string) : Promise<Observable<Turno[]>>
  {
     return this.db.collection<Turno>('turnos', ref => ref.where('idPaciente', '==' ,idpaciente)).valueChanges();
  }

  traerImagenes(email: string)
  {
    const storage = getStorage();
    let url;
    return getDownloadURL(ref(storage, email+'/0.jpg'));

  }

}

