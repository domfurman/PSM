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
          });
      })
      .catch(error => {
        console.error("Error during sign-up:", error);
      });
  }

  // signUp(email: string, password: string) {
  //   this.afAuth.createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       console.log(email, password)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('User logged out successfully')
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        console.log(error)
      });
  }

  isUserSignedIn() {
    // return this.afAuth.currentUser;
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
  //   const auth = getAuth()
  //   const curUser = auth.currentUser
  //   var name = ''
  //   var surname = ''
  //   var credentials = ''
  //   // const user = new User()
  //   this.firestore.collection("clients").get().subscribe((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data() as { email: string, name: string, surname: string, age: number } | undefined;;
  //       if (data && data.email == this.getCurrentUserEmail()) {
  //         const email = data.email || 'N/A';
  //         name = data.name || 'N/A';
  //         surname = data.surname || 'N/A';
  //         // const age = data.age || 'N/A';
  //         credentials = name + " " + surname

  //         // console.log("Email:", email);
  //         // console.log("Name:", name);
  //         // console.log("Surname:", surname);
  //         // console.log("Age:", credentials);
  //         return credentials
  //       } else {
  //         return ""
  //       }
  //     })
  //   }
      
  //     )
  //     return credentials
  return new Observable<string>(observer => {
    const auth = getAuth();
    const curUser = auth.currentUser;
    let name = '';
    let surname = '';
    let credentials = '';
    this.firestore.collection("clients").get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as { email: string, name: string, surname: string, age: number } | undefined;
        if (data && data.email == this.getCurrentUserEmail()) {
          const email = data.email || 'N/A';
          name = data.name || 'N/A';
          surname = data.surname || 'N/A';
          credentials = name + " " + surname;
          observer.next(credentials);
        } else {
          observer.next("");
        }
      });
    });
  });
  }
}

