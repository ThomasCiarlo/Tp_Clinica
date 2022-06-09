import { Injectable } from '@angular/core';
import { first, observable, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class FirebaseloginService {

  constructor(public afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async registrar(email: string, password: string) {
    const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
    await user.user?.sendEmailVerification();
    return `Check your email for verification mail before logging in`;
  }

  async singOut() {
    this.afAuth.signOut();
  }

  async Logueado() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
