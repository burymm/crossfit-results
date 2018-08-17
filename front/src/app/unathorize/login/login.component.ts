import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {UserProfile} from "../../models/models";

declare const gapi : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  password: string;
  login: string;
  
  @Output()
  userAuthorize = new EventEmitter();
  
  constructor(private auth: AuthService,
              private profile: UserService) {
    gapi.load('auth2', () => {
      gapi.auth2.init();
    });
    
  }
  
  ngOnInit() {
    const savedToken = this.auth.loadGoogleToken();
  
    if (savedToken) {
      this.checkGoogleAuthorization(savedToken)
    }
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
          console.log(googleUser.getBasicProfile());
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
      });
  
      this.userAuthorize.emit(authorizedByLogin);
    }, (error) => {
      console.error(error);
    });
  }
}
