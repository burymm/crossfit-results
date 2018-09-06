import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {UserProfile} from "../../models/models";
import { Router } from '@angular/router';

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  password: string;
  login: string;
  
  @Output()
  userAuthorize = new EventEmitter();
  
  constructor(private auth: AuthService,
              private profile: UserService,
              private router: Router,
              private zone: NgZone) {
    gapi.load('auth2', () => {
      gapi.auth2.init();
    });
  }
  
  googleLogin() {
    const savedToken = this.auth.loadGoogleToken();
    
    if (savedToken) {
      this.checkGoogleAuthorization(savedToken)
    } else {
      let googleAuth = gapi.auth2.getAuthInstance();
  
      googleAuth.then(() => {
        googleAuth.signIn({scope: 'profile email'}).then(googleUser => {
          const token = googleUser.getAuthResponse().access_token;
          this.checkGoogleAuthorization(token, true);
        });
      });
    }
  }
  
  userLogin() {
    console.warn('Its not implemented yet. Please use google');
  }
  
  private checkGoogleAuthorization(token, authorizedByLogin = false) {
    this.auth.googleAuthorize(token).subscribe((data: UserProfile) => {
      this.auth.saveGoogleToken(token);
      this.profile.saveProfile({
        name: data.name,
        email: data.email,
        picture: data.picture,
        id: data.id,
      }).subscribe((profile: UserProfile) => {
        this.auth.saveAppToken(profile.token);
        this.zone.run(() => {
          if (profile.cardNumber) {
            this.router.navigate(['/results']);
          } else {
            this.router.navigate(['/user-profile']);
          }
        });
        
      });
    }, (error) => {
      if (error.status === 401) {
        this.auth.logout();
        this.profile.clearProfile();
      }
    });
  }
}
