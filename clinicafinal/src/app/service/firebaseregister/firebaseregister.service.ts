import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { FirebaseloginService } from '../firebaselogin/firebaselogin.service';
import { Usuario } from 'src/app/entidades/usuario/usuario';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Turno } from 'src/app/entidades/turno/turno';
import { Especialidad } from 'src/app/entidades/especialidad/especialidad';

@Injectable({
  providedIn: 'root'
})
export class FirebaseregisterService {

  constructor(public db: AngularFirestore, public serviceLogin: FirebaseloginService, public storage: AngularFireStorage) { }

  createPaciente(email: string, user: Usuario) {
    let resource = '';
    this.serviceLogin.afAuth.user.subscribe(u => {
      if (u?.uid != undefined) {
        resource = u?.uid
      }
      this.db.collection('paciente').doc(resource).set({
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        DNI: user.DNI,
        obraSocial: user.obraSocial,
        mail: user.mail,
        password: user.password,
        tipo: user.tipo,
      })

      for (let index = 0; index < user.imagenes.length; index++) {

        const filepath = user.mail + '/' + index + '.jpg'
        const ref = this.storage.ref(filepath);
        const task = this.storage.upload(filepath, user.imagenes[index]);

      }
    });
  }

  createEspecialista(email: string, user: Usuario) {

    let ulrimg;
    this.serviceLogin.afAuth.user.subscribe(u => {
      this.db.collection('especialista').doc(u?.uid).set({
        id: u?.uid,
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        DNI: user.DNI,
        mail: user.mail,
        password: user.password,
        especialidad: user.especialidad,
        tipo: user.tipo,
        habilitado: user.habilitado,
        franjaHoraria: user.franjaHoraria
      })
    })

    for (let index = 0; index < user.imagenes.length; index++) {
      const filepath = user.mail + '/' + index + '.jpg'
      const ref = this.storage.ref(filepath);
      const task = this.storage.upload(filepath, user.imagenes[index]);
    }
  }

  createUsuario(user: Usuario) {
    let resource = '';
    this.serviceLogin.afAuth.user.subscribe(u => {
      if (u?.uid != undefined) {
        resource = u?.uid
      }
      this.db.collection('usuarios').doc(resource).set({
        mail: user.mail,
        tipo: user.tipo,
      });
    });
  }

  createAdministrador(email: string, user: Usuario) {
    this.serviceLogin.afAuth.user.subscribe(u => {
      this.db.collection('administradores').doc(u?.uid).set({
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        DNI: user.DNI,
        mail: user.mail,
        password: user.password,
        tipo: user.tipo,
      })
    });
  }

  createTurno(turo: Turno) {
    let x = this.db.createId();
    this.db.collection('turnos').doc(x).set({
      id: x,
      dia: turo.dia,
      mes: turo.mes,
      horario: turo.horario,
      especialidad: turo.especialidad,
      estado: 'PENDIENTE',
      idEspecialista: turo.idEspecialista,
      idPaciente: turo.idPaciente,
      nombreApellidoEspecialista: turo.nombreApellidoEspecialista,
      comentario: "",
      calificacion: 0
    });
  }

  crearEspecialidad(esp: string) {
    let x = this.db.createId();
    this.db.collection('especialidades').doc(this.db.createId()).set({
      descripcion: esp,
      imagen: "https://firebasestorage.googleapis.com/v0/b/clinicafinal.appspot.com/o/img_especialidad%2Fdefecto.jpg?alt=media&token=02b656e4-75ae-4000-8614-d155cffc4fee"
    });
  }

  cancelarTurno(turno: Turno) {
    console.log(turno.id);
    return this.db.collection('turnos').doc(turno.id).set(turno);
  }
}
