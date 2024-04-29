import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public firestore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/home'])
      })
      .catch((error) => {
        console.log(error)
        if('vibrate' in navigator){
          navigator.vibrate(300);
        }
      });
  }

  signUp(email: string, password: string, name: string, surname: string, age: number) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.createClient(name, surname, age, email)
          .then(() => {
            console.log("User signed up and client created successfully.");
          })
          .catch(error => {
            console.error("Error creating client:", error);
            if ('vibrate' in navigator) {
              navigator.vibrate(300);
            }
          });
      })
      .catch(error => {
        console.error("Error during sign-up:", error);
        if ('vibrate' in navigator) {
          navigator.vibrate(300);
        }
      });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('User logged out successfully')
        if ('vibrate' in navigator) {
          navigator.vibrate(300);
        }
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        console.log(error)
        if ('vibrate' in navigator) {
          navigator.vibrate(300);
        }
      });
  }

  isUserSignedIn() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    return user !== null;
    
    
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

  async createClient(name: string, surname: string, age: number, email: string) {
    try {
      const docRef = await this.firestore.collection('clients').doc(email).set({
        name: name,
        surname: surname,
        age: age,
        email: email
      });
      console.log("Document written with ID: ", email);
    } catch (error) {
      console.error("Error creating client:", error);
    }
  }

  getCurrentUserEmail() {
    const auth = getAuth()
    const curUser = auth.currentUser
    return curUser?.email
  }

  matchUser(): Observable<string> {
    return new Observable<string>(observer => {

      // checks if user is signed in
      const auth = getAuth();
      const curUser = auth.currentUser;
      if (!curUser) {
        observer.next("");
        return;
      }
      
      // extracts user's email
      const currentUserEmail = this.getCurrentUserEmail();
      console.log(currentUserEmail)
      if (!currentUserEmail) {
        observer.next("");
        return; 
      }
      
      // matches signed inn user's email with email in 'clients' collection
      this.firestore.collection("clients").ref
        .where("email", "==", currentUserEmail)
        .get()
        .then(querySnapshot => {
          // checks if document is not empty
          if (querySnapshot.size === 0) {
            observer.next("");
          // it extracts name and surname from the matched collection
          } else {
            querySnapshot.forEach(doc => {
              const data = doc.data() as { email: string, name: string, surname: string, age: number };
              const name = data.name || 'N/A';
              const surname = data.surname || 'N/A';
              const credentials = name + " " + surname;
              observer.next(credentials);
            });
          }
        })
        // error handling
        .catch(error => {
          console.error("Error getting user document:", error);
          observer.next("");
        });
    });
  }
}

