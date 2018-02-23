import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  currentUser;
  constructor(private authService: AuthService,
    private firebaseAuth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logOut();
  }

}
