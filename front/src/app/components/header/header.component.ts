import {Component, Input} from "@angular/core";
import { UserProfile } from '../../models/models';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  @Input()
  title: string;
  
  profile: UserProfile;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
    this.profile = this.userService.getProfile();
  }
  
  logout() {
    this.authService.logout();
    this.userService.clearProfile();
    this.router.navigateByUrl('login');
    setTimeout(() => {
      location.reload();
    }, 50);
  }
  
  showUserProfile() {
    console.log('Not implemented');
  }
}
