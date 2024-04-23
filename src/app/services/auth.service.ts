import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Login successful
      })
      .catch((error) => {
        console.log(error)
      });
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log(email, password)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        console.log(error)
      });
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

  async signInWithGoogle() {
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log('signInWithGoogle: success', result);
    } catch (error) {
      console.error('signInWithGoogle: failure', error);
    }
  }
  }

