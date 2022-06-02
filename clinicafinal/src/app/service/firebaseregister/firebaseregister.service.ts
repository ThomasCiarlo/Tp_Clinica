import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { FirebaseloginService } from '../firebaselogin/firebaselogin.service';
import { Usuario } from 'src/app/entidades/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirebaseregisterService {

  constructor(public db: AngularFirestore, public serviceLogin: FirebaseloginService) { }

  createPaciente(email: string, user: Usuario) {
    let resource = JSON.stringify(user)
    this.db.collection('usuarios').doc(this.db.createId()).set({
      nombre: user.nombre,
      apellido: user.apellido,
      edad: user.edad,
      DNI: user.DNI,
      obraSocial: user.obraSocial,
      mail: user.mail,
      password: user.password,
      imagenes: user.imagenes,
      especialidad: user.especialidad,
      tipo: user.tipo,
    })
  }

  createEspecialista(email: string, user: Usuario) {
    let resource = JSON.stringify(user)
    this.db.collection('especialista').doc(this.db.createId()).set({
      nombre: user.nombre,
      apellido: user.apellido,
      edad: user.edad,
      DNI: user.DNI,
      mail: user.mail,
      password: user.password,
      imagenes: user.imagenes,
      especialidad: user.especialidad,
      tipo: user.tipo,
      habilitado: user.habilitado,
    })
  }

  createAdministrador(email: string, user: Usuario) {
    let resource = JSON.stringify(user)
    this.db.collection('administradores').doc(this.db.createId()).set({
      nombre: user.nombre,
      apellido: user.apellido,
      edad: user.edad,
      DNI: user.DNI,
      mail: user.mail,
      password: user.password,
      tipo: user.tipo,
    })
  }
}
