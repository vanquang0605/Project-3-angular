import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  user;
  token: string;
  constructor(private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router) {
    this.firebaseAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.router.navigate(['']);
      } else {
        this.user = null;
        console.log('please log in !');
      }
    });
  }

  signUp(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.getToken();
      })
      .catch(error => {
        console.log('Something went wrong:', error.message);
      });
  }

  logIn(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.getToken();
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logOut() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken(true)
      .then((token) => {
        this.token = token;
        this.router.navigate(['/book']);
      });
  }
}
