import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { UserProfile } from './models/models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
	constructor(public userService: UserService,
              private router: Router,
              private ref: ChangeDetectorRef,
              private auth: AuthService) {
	}
  
  
  ngOnInit() {
    const appToken = this.auth.loadAppToken();
    const savedToken = this.auth.loadGoogleToken();
    
    if (appToken) {
      this.loginViaToken(appToken);
    } else if (savedToken) {
      this.checkGoogleAuthorization(savedToken)
    } else {
      this.router.navigateByUrl('login');
    }
  }
  
  loginViaToken(appToken) {
    this.auth.loginViaAppToken(appToken).subscribe((authData: UserProfile) => {
      this.userService.setProfile(authData);
      if (!authData.cardNumber) {
        this.router.navigate(['/user-profile']);
      }
    }, (error) => {
      this.auth.logout();
    });
  }
  
  private checkGoogleAuthorization(token, authorizedByLogin = false) {
    this.auth.googleAuthorize(token).subscribe((data: UserProfile) => {
      this.auth.saveGoogleToken(token);
      this.userService.saveProfile({
        name: data.name,
        email: data.email,
        picture: data.picture,
        id: data.id,
      }).subscribe((profile: UserProfile) => {
        this.auth.saveAppToken(profile.token);
      });
      
    }, (error) => {
      if (error.status === 401) {
        this.auth.logout();
        this.userService.clearProfile();
      }
    });
  }
}
